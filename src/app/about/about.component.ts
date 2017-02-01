import {Component, OnInit, OnDestroy} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {Archive} from "../model/enums";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

    constructor(private searchService: ArchiveService) {
    }

    send(value) {
        console.log(value);
    }

    ngOnInit() {
        this.searchService.activate(Archive.article);
    }

    ngOnDestroy() {
        this.searchService.deactivate();
    }

}
