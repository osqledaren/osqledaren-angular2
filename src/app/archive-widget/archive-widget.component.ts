import {Component, OnInit, OnDestroy} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {ArchiveDistribution} from "../model/archive-distribution";
import {isUndefined} from "util";

@Component({
    selector: 'app-archive',
    templateUrl: 'archive-widget.component.html',
    styleUrls: ['archive-widget.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

    public yearInput: {index: string, year:string};
    public monthInput: string;
    public visible: boolean = false;
    public distribution: ArchiveDistribution[];
    public months: number[];
    private sub;

    constructor(private archiveService: ArchiveService) {
    }

    public setArchive() {

        let index = !isUndefined(this.yearInput) ? Number(this.yearInput.index): undefined;
        let year = !isUndefined(this.yearInput) ? Number(this.yearInput.year): undefined;
        let month = Number(this.monthInput);
        this.archiveService.setArchive(index,year,month);

    }

    ngOnInit() {
        this.sub = this.archiveService.activated.subscribe(
            (activated) => {
                this.visible = activated;
            }
        );

        this.sub = this.archiveService.archiveDistribution.subscribe(
            (archiveDistribution) => {
                this.distribution = archiveDistribution;
                this.months = archiveDistribution[0].months; // Set collection of months of current year.
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
