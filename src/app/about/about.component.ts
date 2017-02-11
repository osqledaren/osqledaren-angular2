import {Component} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {Archive} from "../shared/enums";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent extends LoadableComponent {

    constructor(private searchService: ArchiveService,
                loaderService: LoaderService) {
        super(loaderService);
    }

    init() {
        this.loaded();
        this.searchService.activate(Archive.article);
    }

}
