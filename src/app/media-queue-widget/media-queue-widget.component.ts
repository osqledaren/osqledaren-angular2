import {Component, OnInit} from "@angular/core";
import {MediaQueueService} from "../media-queue.service";
import {isNullOrUndefined} from "util";
import {MediaQueueSidebarComponent} from "../media-queue-sidebar/media-queue-sidebar.component";

@Component({
    selector: 'app-media-queue-widget',
    templateUrl: 'media-queue-widget.component.html',
    styleUrls: ['media-queue-widget.component.scss']
})
export class MediaQueueWidgetComponent implements OnInit {
    private queueCount: number;
    private sidebarVisible: boolean;

    constructor(private queueService: MediaQueueService) {
    }

    ngOnInit() {
        this.queueService.subjects.queue.subscribe((queue) => {
            this.queueCount = !isNullOrUndefined(queue) ? queue.size() : 0;
        });
    }

    private toggleSideBar() {
        this.sidebarVisible = this.queueService.toggleSidebar();
    }

}
