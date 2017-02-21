import {Injectable, Inject} from "@angular/core";
import {Archive} from "./shared/enums";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {ArchiveDistribution} from "./shared/interface/archive-distribution.interface";
import {isNullOrUndefined} from "util";
import {PadNumberPipe} from "./pad-number.pipe";
import {Response, Http} from "@angular/http";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {APP_CONFIG} from "./app.config";
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {YearInput} from "./shared/interface/year-input.interface";

@Injectable()
export class ArchiveService extends ContentService {

    private archive: Archive = null;
    private archiveDistributionElements = <ArchiveDistribution[]>[];
    public searchTerm: string = '';
    public date: string = '';
    public activated: Subject<boolean> = new Subject();
    public archiveDistribution: Subject<ArchiveDistribution[]> = new Subject();
    public activeArchive: Subject<Archive> = new Subject();
    public resetListener: Subject<boolean> = new Subject();
    public filterActive: Subject<boolean> = new Subject();
    public filter: Subject<{yearInput:number, months:[number], month:string, searchTerm:string}> = new Subject();

    constructor(private router: Router,
                protected http: Http,
                @Inject(APP_CONFIG) config) {
        super();

        this.endpoint = config.wordpressEndpoint;
    }

    public activate(archive: Archive) {

        if (this.archive === archive) {
            return; // Already active;
        }

        this.reset();

        this.archive = archive;
        this.activeArchive.next(archive);
        this.activated.next(true);

        let postType: string;

        switch (archive) {
            case Archive.article:
                postType = 'post';
                break;
            default:
                postType = Archive[archive];
        }

        this.http.get(this.endpoint + '/archives/' + postType)
            .map(this.map)
            .catch(this.handleError).subscribe(
            (distribution) => {
                this.archiveDistributionElements = distribution;
                this.archiveDistribution.next(distribution);
            }
        );
    }

    public deactivate() {
        this.searchTerm = '';
        this.date = '';
        this.archive = null;
        this.activated.next(false);
    }

    public setArchive(index: number, year: number, month?: number) {

        let date: string = '';

        this.searchTerm = ''; // Reset search term.

        if (isNullOrUndefined(index)) {
            this.getArchive();
            return;
        }

        let lastYearIndex: number = this.archiveDistributionElements.length - 1;

        // Validate year selection.
        if (year <= this.archiveDistributionElements[0].year &&
            year >= this.archiveDistributionElements[lastYearIndex].year) {

            date = year.toString();

            if (!isNullOrUndefined(month)) {
                let lastMonthIndex = this.archiveDistributionElements[index].months.length - 1;

                // Year is a valid number, check if month is selected and valid.
                if (month <= toInteger(this.archiveDistributionElements[index].months[0]) &&
                    month >= toInteger(this.archiveDistributionElements[index].months[lastMonthIndex])) {
                    date += '-' + (new PadNumberPipe().transform(month, 2)); // Pad the month so it begins with zero if necessary.
                }
            }
        }

        this.date = date;
        this.reset(false);
        this.getArchive();
    }

    public search(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.getArchive();
    }

    private getArchive() {

        switch (this.archive) {

            case Archive.article:
                if (!isNullOrUndefined(this.searchTerm) && this.searchTerm.length > 0) {

                    if (this.date.length > 0) {

                        let routerParams: Array<string> = ['/nyheter', 'arkiv'];
                        routerParams.push(this.date);
                        routerParams.push(this.searchTerm);

                        this.router.navigate(routerParams);
                    } else {
                        this.router.navigate(['/nyheter', 'sok', this.searchTerm]);
                    }

                    this.filterActive.next(true);

                } else if (this.date.length > 0) {
                    this.filterActive.next(true);
                    this.router.navigate(['/nyheter', 'arkiv', this.date]);
                } else {
                    this.filterActive.next(false);
                    this.router.navigate(['/nyheter']);
                }

                break;
            case Archive.play:
                break;
            case Archive.pod:
                break;
            default:
                break;
        }
    }

    public reset(date?: boolean) {
        if (isNullOrUndefined(date)) {

            if (!date) {
                this.date = '';
                this.filterActive.next(false);
                this.resetListener.next(true);
            }
        } else {
            this.resetListener.next(false);
        }
    }

    /**
     * Maps a response object to an ArchiveDistribution array
     * @param res:Response
     * @returns {ArchiveDistribution[]|{}}
     */
    protected map(res: Response) {
        let json: any = res.json();
        let distribution: ArchiveDistribution[] = <ArchiveDistribution[]>[];

        for (let i in json) {

            distribution.push(<ArchiveDistribution>{
                year: json[i].year,
                months: json[i].months
            });
        }

        return distribution;
    }

}
