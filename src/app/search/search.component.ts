import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from "../search.service";

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

	public searchInput: string;
	public visible: boolean = false;
	public activated: boolean;
	private sub;

	constructor(private searchService: SearchService) {
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

	}

}
