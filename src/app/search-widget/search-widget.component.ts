import {Component, OnInit, OnDestroy} from '@angular/core';
import {ArchiveService} from "../archive.service";

@Component({
	selector: 'app-search',
	templateUrl: 'search-widget.component.html',
	styleUrls: ['search-widget.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

	public searchInput: string;
	public visible: boolean = false;
	public activated: boolean;
	private sub;

	constructor(private searchService: ArchiveService) {
	}

	public show(){
		//this.visible = this.searchService.activated;
	}

	public hide(){
		//this.visible = false;
	}

	public toggleVisibility() {
		if (this.visible) {
			this.hide();
		} else {
			this.show();
		}
	}

	public search(){
		this.searchService.search(this.searchInput);
	}

	ngOnInit() {
		this.sub = this.searchService.activated.subscribe(
			(activated) => this.activated = activated
		);
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

}
