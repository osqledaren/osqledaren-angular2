import {Component} from "@angular/core";
import {FooterService} from "./footer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Footer} from "./footer.interface";
import {isNullOrUndefined} from "util";

@Component({
			selector: 'app-footer',
			templateUrl: 'footer.component.html',
			styleUrls: ['footer.component.scss']
		})
	export class FooterComponent {
	    public footer: Footer;
			private year;

	    constructor(protected FS: FooterService) {}

	    protected initializeData() {
	      this.FS.getFooterPage().subscribe(
	        pages => {
	        	this.footer = pages[0];
	       	},
	       	error => {
	        	// TODO: What if loading the footer fails?
	    		});
	    }

		init() {
			var today = new Date();
			this.year = today.getFullYear();

			this.initializeData();
		}
}
