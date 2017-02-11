import {Component, OnInit, OnDestroy} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {ArchiveDistribution} from "../shared/interface/archive-distribution.interface";
import {isUndefined} from "util";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";


interface YearInput {
    index: string;
    year: string
}

@Component({
    selector: 'app-archive',
    templateUrl: 'archive-widget.component.html',
    styleUrls: ['archive-widget.component.scss']
})
export class ArchiveComponent extends LoadableComponent{

    public yearInput: YearInput;
    public monthInput: string;
    public visible: boolean = false;
    public distribution: ArchiveDistribution[];
    public months: number[];

    constructor(private archiveService: ArchiveService,
                loaderService: LoaderService) {
        super(loaderService);
    }

    public setArchive() {

        let index = !isUndefined(this.yearInput) ? Number(this.yearInput.index): undefined;
        let year = !isUndefined(this.yearInput) ? Number(this.yearInput.year): undefined;
        let month = Number(this.monthInput);
        this.archiveService.setArchive(index,year,month);

    }

    public setMonths(year: YearInput | string){

        if(typeof(year) === 'string'){
            this.months = [];
            return;
        }

        this.months = this.distribution[year.index].months;
    }

    init() {

        this.sub = this.archiveService.activated.subscribe(
            (activated) => {
                this.visible = activated;
                this.loaded();
            }
        );

        this.sub = this.archiveService.archiveDistribution.subscribe(
            (archiveDistribution) => {
                this.distribution = archiveDistribution;
                this.months = archiveDistribution[0].months; // Set collection of months of current year.
            }
        );
    }

}
