import {Injectable} from "@angular/core";
import {Archive} from "./model/enums";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import {ArchiveDistribution} from "./model/archive-distribution";
import {isNullOrUndefined} from "util";
import {padNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import {PadNumberPipe} from "./pad-number.pipe";

@Injectable()
export class ArchiveService {

    private archive: Archive = null;
    private archiveDistributionElements = <ArchiveDistribution[]>[];
    private date: string = '';
    private searchTerm: string = '';
    public activated: Subject<boolean> = new Subject();
    public archiveDistribution: Subject<ArchiveDistribution[]> = new Subject();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    private getArchiveDistribution(): ArchiveDistribution[] {

        // TODO: Get archive from wordpress.


        this.archiveDistributionElements = <ArchiveDistribution[]>[];

        this.archiveDistributionElements.push(<ArchiveDistribution>{
            year: 2017,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });

        this.archiveDistributionElements.push(<ArchiveDistribution>{
            year: 2016,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });

        return this.archiveDistributionElements;
    }

    public activate(archive: Archive) {

        if(this.archive === archive){
            return; // Already active;
        }

        this.activatedRoute.params.map((params: Params) => {
                this.searchTerm = params['searchTerm'];
                this.date = params['date'];
            }
        );

        this.archive = archive;
        this.activated.next(true);
        this.archiveDistribution.next(this.getArchiveDistribution());
    }

    public deactivate() {
        this.searchTerm = '';
        this.date = '';
        this.archive = null;
        this.activated.next(false);
    }

    public currentArchive(): Archive {
        return this.archive;
    }

    public setArchive(index: number, year: number, month?: number) {

        let date:string = '';

        this.searchTerm = ''; // Reset search term.

        if(isNullOrUndefined(index)){
            this.getArchive();
            return;
        }

        let lastYearIndex: number = this.archiveDistributionElements.length - 1;

        // Validate year selection.
        if (year <= this.archiveDistributionElements[0].year &&
            year >= this.archiveDistributionElements[lastYearIndex].year) {

            date = year.toString();

            if(!isNullOrUndefined(month)){
                let lastMonthIndex = this.archiveDistributionElements[index].months.length - 1;

                // Year is a valid number, check if month is selected and valid.
                if (month >= this.archiveDistributionElements[index].months[0] &&
                    month <= this.archiveDistributionElements[index].months[lastMonthIndex]) {
                    date += '-' + (new PadNumberPipe().transform(month,2)); // Pad the month so it begins with zero if necessary.
                }
            }
        }

        this.date = date;
        this.getArchive();
    }

    public getMonths(index: number): Array<number> {
        return this.archiveDistributionElements[index].months;
    }

    public search(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.getArchive();
    }

    private getArchive(){

        switch (this.archive) {
            case Archive.article:

                if(!isNullOrUndefined(this.searchTerm) && this.searchTerm.length > 0){

                    if (this.date.length > 0) {

                        let routerParams: Array<string> = ['/articles', 'archive'];
                        routerParams.push(this.date);
                        routerParams.push(this.searchTerm);

                        this.router.navigate(routerParams);
                    } else {
                        this.router.navigate(['/articles', 'search', this.searchTerm]);
                    }

                } else if( this.date.length > 0) {
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

}
