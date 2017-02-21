import {Component, OnInit, OnDestroy} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {ArchiveDistribution} from "../shared/interface/archive-distribution.interface";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {YearInput} from "../shared/interface/year-input.interface";

@Component({
    selector: 'app-archive',
    templateUrl: 'archive-widget.component.html',
    styleUrls: ['archive-widget.component.scss']
})
export class ArchiveComponent extends LoadableComponent{

    public yearInput: number;
    public monthInput: string;
    public visible: boolean = false;
    public distribution: ArchiveDistribution[];
    public months: number[];

    constructor(private archiveService: ArchiveService,
                loaderService: LoaderService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        super(loaderService);
    }

    public setArchive() {

        let index = !isNullOrUndefined(this.yearInput) ? Number(this.yearInput): undefined;
        let year = !isNullOrUndefined(this.yearInput) ? Number(this.distribution[this.yearInput].year): undefined;
        let month = Number(this.monthInput);

        if(index !== undefined){
            this.archiveService.setArchive(index, year, month);
        }

    }

    public setMonths(index: number | null){

        if(typeof(index) === null){
            this.months = [];
            return;
        } else {
            this.months = this.distribution[index].months;
        }

    }

    init() {


        this.sub = this.archiveService.activated.subscribe(
            (activated) => {
                this.visible = activated;
                this.loaded();
            }
        );

        this.sub = this.archiveService.resetListener.subscribe(
            (date) => {
                if(date){
                    this.yearInput = null;
                    this.monthInput = '';
                    this.months = [];
                }
            }
        );

        this.sub = this.archiveService.archiveDistribution.subscribe(
            (archiveDistribution) => {
                this.distribution = archiveDistribution;
                this.months = archiveDistribution[0].months; // Set collection of months of current year.

                this.archiveService.filter.subscribe(
                    filter => {
                        this.yearInput = filter.yearInput;
                        this.months = filter.months;
                        this.monthInput = filter.month;
                    }
                );
            }
        );
    }

}
