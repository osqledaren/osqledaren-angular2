import {Component} from "@angular/core";
import {ArchiveService} from "../archive.service";
import {ArchiveEnum} from "../shared/enums";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends LoadableComponent {

    constructor(private archiveService: ArchiveService, loaderService: LoaderService) {
        super(loaderService);
    }

    init() {
        this.archiveService.activate(ArchiveEnum.article);
        this.loaded();

        this.archiveService.activated.subscribe(
            () => {
                Observable.timer(0).subscribe(
                    () => {
                        this.archiveService.applyFilter(null, false);
                    }
                )
            }
        );

    }

}
