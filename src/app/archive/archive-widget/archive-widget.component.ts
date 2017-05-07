import {Component} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import Dictionary from "typescript-collections/dist/lib/Dictionary";
import {LoadableComponent} from "../../loader/abstract.loadable.component";
import {LoaderService} from "../../loader/loader.service";
import {PadNumberPipe} from "../../shared/pad-number.pipe";

@Component({
    selector: 'app-archive-widget',
    templateUrl: 'archive-widget.component.html',
    styleUrls: ['archive-widget.component.scss']
})
export class ArchiveWidgetComponent extends LoadableComponent {

    public years: number[];
    public yearInput: string;
    public monthInput: string;
    public visible: boolean = false;
    public distribution: Dictionary<number, number[]>;
    public months: number[];

    constructor(private archiveService: ArchiveService,
                loaderService: LoaderService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        super(loaderService);
    }

    public apply() {
        if (!isNullOrUndefined(this.yearInput) && this.yearInput != '') {
            this.archiveService.applyFilter({year: Number(this.yearInput), month: Number(this.monthInput)});
        }
    }

    public setMonths(year: string) {

        if (year.length == 0) {
            this.months = [];
            return;
        } else {
            this.months = this.distribution.getValue(Number(year));
        }

    }

    init() {

        this.sub = this.archiveService.activated.subscribe(
            (activated) => {
                this.visible = activated;
                this.loaded();
            }
        );

        this.sub = this.archiveService.distributions.subscribe(
            (dist) => {
                this.years = dist.keys().reverse(); // Make an array of years in descending order.
                this.distribution = dist;
                this.months = []; // Set collection of months of current year.

                this.archiveService.filter.subscribe(
                    filter => {
                        this.yearInput = isNullOrUndefined(filter.year) ? '' : filter.year.toString();
                        this.months = isNullOrUndefined(filter.year) ? [] : this.distribution.getValue(filter.year);
                        this.monthInput = isNullOrUndefined(filter.month) ? '' : new PadNumberPipe().transform(filter.month, 2);
                    }
                );
            }
        );
    }

}
