import {Injectable, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {isNullOrUndefined} from "util";
import {Response, Http} from "@angular/http";
import {ContentService} from "../content/abstract.content.service";
import {PadNumberPipe} from "../shared/pad-number.pipe";
import Dictionary from "typescript-collections/dist/lib/Dictionary";
import {Archive} from "./archive.enum";
import {environment} from "../../environments/environment";

interface ArchiveFilter {
    year: number,
    month: number,
    dateString: string,
    searchTerm: string,
}

@Injectable()
export class ArchiveService extends ContentService{

    private _archive: Archive = null;
    private _distributions: Dictionary<number, number[]> = new Dictionary<number, number[]>();
    private _filter: ArchiveFilter = <ArchiveFilter>{};


    // TODO: group subjects into single object
    public archive: Subject<Archive> = new Subject<Archive>();
    public activated: Subject<boolean> = new Subject<boolean>();
    public distributions: Subject<Dictionary<number, number[]>> = new Subject<Dictionary<number,number[]>>();
    public filterActive: Subject<boolean> = new Subject<boolean>();
    public filter: Subject<ArchiveFilter> = new Subject<ArchiveFilter>();


    constructor(private router: Router,
                protected http: Http) {
        super(http, environment.wordpress.endpoint + '/wp-json/wp/v2');

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

        let years: number[] = this._distributions.keys();

        years = years.reverse(); // Make years ascending

        let lastYear: number = years.length - 1;
        let dateString: string = '';

        // Validate year selection.
        if (year >= years[0] &&
            year <= years[lastYear]) {

            this._filter.year = year;
            dateString += year.toString();

            if (!isNullOrUndefined(month)) {
                let lastMonth = this._distributions.getValue(year).length - 1;

                // Year is a valid number, check if month is selected and valid (Note descending array order).
                if (month <= this._distributions.getValue(year)[0] &&
                    month >= this._distributions.getValue(year)[lastMonth]) {

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
        let dist = new Dictionary<number, number[]>();

        for (let i in json) {
            dist.setValue(Number(json[i].year), json[i].months);
        }

        return dist;
    }
}
