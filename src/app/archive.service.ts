import {Injectable, Inject} from "@angular/core";
import {Archive} from "./shared/enums";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {isNullOrUndefined} from "util";
import {Response, Http} from "@angular/http";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {APP_CONFIG} from "./app.config";
import {Dictionary} from "./shared/class/dictionary.class";
import {PadNumberPipe} from "./pad-number.pipe";

interface ArchiveFilter {
    year: number,
    month: number,
    dateString: string,
    searchTerm: string,
}

@Injectable()
export class ArchiveService extends ContentService {

    private _archive: Archive = null;
    private _distributions: Dictionary<string[]> = new Dictionary<string[]>();
    private _filter: ArchiveFilter = <ArchiveFilter>{};

    public archive: Subject<Archive> = new Subject();
    public activated: Subject<boolean> = new Subject();
    public distributions: Subject<Dictionary<string[]>> = new Subject();
    public filterActive: Subject<boolean> = new Subject();
    public filter: Subject<ArchiveFilter> = new Subject();


    constructor(private router: Router,
                protected http: Http,
                @Inject(APP_CONFIG) config) {
        super();

        this.endpoint = config.wordpressEndpoint;
    }

    public reset() {
        this._filter.year = null;
        this._filter.month = null;
        this._filter.searchTerm = '';
        this._filter.dateString = '';
        this.filterActive.next(false);
        this.emitFilter(false);
    }

    private emitFilter(active: boolean = true) {
        this.filterActive.next(active);
        this.filter.next(this._filter);
    }

    public activate(archive: Archive) {

        if (this._archive === archive) {
            return; // Already active;
        }

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
            (dist) => {

                this._distributions = dist;
                this.distributions.next(dist);

                this.reset();
                this._archive = archive;
                this.archive.next(archive);
                this.activated.next(true);
            }
        );
    }

    public deactivate() {
        this.activated.next(false);
    }

    public applyFilter(params?: {year?: number, month?: number, searchTerm?: string}, navigate = true) {

        if (isNullOrUndefined(params) || Object.keys(params).length == 0) {
            this.reset();
            if (navigate) {
                this.navigate();
            }
            return;
        }

        if (!isNullOrUndefined(params.year)) {
            this.applyDateFilter(params.year, params.month);
        }

        if (!isNullOrUndefined(params.searchTerm)) {
            this.applySearchFilter(params.searchTerm);
        }

        if (navigate) {
            this.navigate();
        }

        this.emitFilter();
    }

    private applyDateFilter(year: number, month?: number) {

        this._filter.searchTerm = ''; // Reset search term.

        let years: number[] = this._distributions.keys().map(Number);
        let lastYear: number = years.length - 1;
        let dateString: string = '';

        // Validate year selection (Not ascending array order).
        if (year >= years[0] &&
            year <= years[lastYear]) {

            this._filter.year = year;
            dateString += year.toString();

            if (!isNullOrUndefined(month)) {
                let lastMonth = this._distributions.item(year.toString()).length - 1;

                // Year is a valid number, check if month is selected and valid (Note descending array order).
                if (month <= Number(this._distributions.item(year.toString())[0]) &&
                    month >= Number(this._distributions.item(year.toString())[lastMonth])) {

                    this._filter.month = month;
                    dateString += '-' + new PadNumberPipe().transform(month, 2);

                }
            }
            this._filter.dateString = dateString;
        }
    }

    private applySearchFilter(searchTerm: string) {
        this._filter.searchTerm = searchTerm;
    }

    private navigate() {

        switch (this._archive) {
            case Archive.article:
                if (!isNullOrUndefined(this._filter.searchTerm)) {

                    if (this._filter.searchTerm.length > 0) {

                        if (this._filter.dateString.length > 0) {

                            let routerParams: Array<string> = ['/nyheter', 'arkiv'];
                            routerParams.push(this._filter.dateString);
                            routerParams.push(this._filter.searchTerm);

                            this.router.navigate(routerParams);
                        } else {
                            this.router.navigate(['/nyheter', 'sok', this._filter.searchTerm]);
                        }
                    } else if (this._filter.dateString.length > 0) {
                        this.router.navigate(['/nyheter', 'arkiv', this._filter.dateString]);
                    } else {
                        this.router.navigate(['/nyheter']);
                    }
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
     * @param res: Response
     * @returns {Dictionary<number[]>}
     */
    protected map(res: Response) {
        let json: any = res.json();
        let dist = new Dictionary<number[]>();

        for (let i in json) {
            dist.add(json[i].year, json[i].months);
        }

        return dist;
    }

}
