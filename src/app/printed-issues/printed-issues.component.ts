import { Component, OnInit } from '@angular/core';
import {ArchiveService} from "../archive.service";
import {ArchiveEnum} from "../shared/enums";
import {LoadableComponent} from "../shared/abstract/abstract.loadable.component";
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-printed-issues',
  templateUrl: './printed-issues.component.html',
  styleUrls: ['./printed-issues.component.scss']
})
export class PrintedIssuesComponent extends LoadableComponent {
  itemImages1617: Array<string>;
  itemImages1516: Array<string>;

  public printedIssues = [
    {
      "year": "16/17",
      "issues": [
        "/assets/img/printed-issues/161700.png",
        "/assets/img/printed-issues/161701.png",
        "/assets/img/printed-issues/161702.png",
        "/assets/img/placeholder-printed-issues.png",
        "/assets/img/placeholder-printed-issues.png"
      ]
    },
    {
      "year": "15/16",
      "issues": [
        "/assets/img/printed-issues/151600.png",
        "/assets/img/printed-issues/151601.png",
        "/assets/img/printed-issues/151602.png",
        "/assets/img/printed-issues/151603.png",
        "/assets/img/printed-issues/151604.png"
      ]
    },
    {
      "year": "14/15",
      "issues": [
        "https://image.isu.pub/140903103228-38010298161cece30f4ab2f5c4bbdaa1/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/141128232153-067219625361f694a356d3f961e7d8c8/jpg/page_1_thumb_large.jpg",
        "assets/img/printed-issues/141502.png",
        "assets/img/printed-issues/141503.png",
        "assets/img/printed-issues/141504.png"
      ]
    },
    {
      "year": "13/14",
      "issues": [
        "https://image.isu.pub/140122163457-556385cdc996f73b1a36ed5faf2ebadd/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140122163515-8495d56c96fb73faf037fa08c679e45b/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140122155439-406be120cad70dc8dbad324236cdb3a0/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140325134913-911b2a5b633355bbbfb14807d3a1e93a/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140521081054-bf53cb66629fdd3e741f6c547b6e4020/jpg/page_1_thumb_large.jpg"
      ]
    },
    {
      "year": "12/13",
      "issues": [
        "https://image.isu.pub/140124165714-0fb436a78c28284d9e0cf3bf5cd9e853/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140124161412-aa46c553762388772f71f171f21b1c96/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140124165731-785470d503d489ce164a152fa35f3a21/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140124174527-4c19d9552f31fa7dd040962d6ccda153/jpg/page_1_thumb_large.jpg",
        "https://image.isu.pub/140124174607-f75eb44cf133e21b96970993e4fac319/jpg/page_1_thumb_large.jpg"
      ]
    }
  ];

  constructor(private archiveService: ArchiveService, loaderService: LoaderService) {
    super(loaderService);
  }

  ngOnInit() {
  	this.archiveService.activate(ArchiveEnum.article);
  	this.loaded();
  }

}
