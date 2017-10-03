import {Component, OnInit} from "@angular/core";
import {LoadableComponent} from "../loader/abstract.loadable.component";
import {AppLoaderService} from "../loader/app-loader.service";
import {ArchiveService} from "../archive/archive.service";
import {PlayService} from "./play.service";
import {Archive} from "../archive/archive.enum";


export abstract class BroadcastViewComponent extends LoadableComponent{

    constructor(loaderService: AppLoaderService,
                private archiveService: ArchiveService,
                public mediaService: PlayService) {
        super(loaderService);
    }

    init() {
        this.archiveService.activate(Archive.article);
        this.mediaService.initialized.subscribe((loaded) => {
            if (loaded) this.loaded();
        });
    }

    destroy(){
        this.mediaService.initialized.next(false);
    }

}
