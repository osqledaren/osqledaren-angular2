import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";
import {isNullOrUndefined} from "util";
import {ArchiveService} from "../archive.service";
import {ArchiveType} from "../shared/enums";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends LoadableComponent {

  private errorStatus;
  private errorOrigin;

  constructor(private route: ActivatedRoute,
              private archiveService: ArchiveService,
              private router: Router, loaderService: LoaderService) {
    super(loaderService);
  }

  init(){
    this.archiveService.activate(ArchiveType.article);
    this.sub = this.route.queryParams.subscribe((qp)=>{

      if (isNullOrUndefined(qp['status'])) {
        this.loaded();
        this.router.navigate(['/']);
      } else {

        this.loaded();
        this.errorStatus = qp['status'];
        this.errorOrigin = qp['origin'];
      }

    });


  }
}
