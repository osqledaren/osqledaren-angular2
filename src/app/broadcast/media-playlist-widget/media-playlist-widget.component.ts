import {Component, OnInit} from "@angular/core";
import {MediaPlaylistService} from "../media-playlist.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-media-playlist-widget',
    templateUrl: 'media-playlist-widget.component.html',
    styleUrls: ['media-playlist-widget.component.scss']
})
export class MediaPlaylistWidgetComponent implements OnInit {
    private playlistSize: number;
    private sidebarVisible: boolean;

    constructor(private playlistService: MediaPlaylistService) {
    }

    ngOnInit() {
        this.playlistService.subjects.playlist.subscribe((playlist) => {
            this.playlistSize = !isNullOrUndefined(playlist) ? playlist.size() : 0;
        });
    }

    private toggleSideBar() {
        this.sidebarVisible = this.playlistService.toggleSidebar();
    }

}
