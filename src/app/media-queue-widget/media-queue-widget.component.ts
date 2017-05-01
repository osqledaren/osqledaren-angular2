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
        this.queueService.queue.subscribe((queue) => {
            try {
                this.queueCount = queue.items.length;
            } catch(e){
                this.queueCount = 0;
            }
        });
    }

    private toggleSideBar() {
        this.sidebarVisible = this.queueService.toggleSidebar();
    }

}
