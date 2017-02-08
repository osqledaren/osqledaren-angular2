import {Injectable, Inject} from "@angular/core";
import {Archive} from "./shared/enums";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {ArchiveDistribution} from "./shared/interface/archive-distribution.interface";
import {isNullOrUndefined} from "util";
import {PadNumberPipe} from "./pad-number.pipe";
import {Response, Http} from "@angular/http";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {APP_CONFIG} from "./app.config";

@Injectable()
export class ArchiveService extends ContentService {

    private archive: Archive = null;
    private archiveDistributionElements = <ArchiveDistribution[]>[];
    private date: string = '';
    private searchTerm: string = '';
    public activated: Subject<boolean> = new Subject();
    public archiveDistribution: Subject<ArchiveDistribution[]> = new Subject();

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                protected http: Http,
                @Inject(APP_CONFIG) config) {
        super();

        this.endpoint = config.wordpressEndpoint;
    }

    public activate(archive: Archive) {

        if (this.archive === archive) {
            return; // Already active;
        }

        this.activatedRoute.params.map((params: Params) => {
                this.searchTerm = params['searchTerm'];
                this.date = params['date'];
            }
        );

        this.archive = archive;
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
            .map(ArchiveService.extractData)
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
                if (month >= this.archiveDistributionElements[index].months[0] &&
                    month <= this.archiveDistributionElements[index].months[lastMonthIndex]) {
                    date += '-' + (new PadNumberPipe().transform(month, 2)); // Pad the month so it begins with zero if necessary.
                }
            }
        }

        this.date = date;
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

                        let routerParams: Array<string> = ['/articles', 'archive'];
                        routerParams.push(this.date);
                        routerParams.push(this.searchTerm);

                        this.router.navigate(routerParams);
                    } else {
                        this.router.navigate(['/articles', 'search', this.searchTerm]);
                    }

                } else if (this.date.length > 0) {
                    this.router.navigate(['/articles', 'archive', this.date]);
                } else {

                    this.router.navigate(['/articles']);
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

    /**
     * Maps a response object to an ArchiveDistribution array
     * @param res:Response
     * @returns {ArchiveDistribution[]|{}}
     */
    protected static extractData(res: Response) {
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
