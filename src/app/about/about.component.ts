import {Component} from "@angular/core";
import {AboutService} from "./about.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArchiveService} from "../archive/archive.service";
import {Archive} from "../archive/archive.enum";
import {Page} from "../content/page.interface";
import {LoadableComponent} from "../loader/abstract.loadable.component";
import {AppLoaderService} from "../loader/app-loader.service";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

	export class AboutComponent extends LoadableComponent {
	    public about: Page;
	    public aboutTheEditor;
	    public feedbackText;
	    public leadEditorName;
	    public editorialYear;
	    public aboutTelephone;
	    public aboutEmail;
	    public visitorsAddress;
	    public postAddress;

	    constructor(private searchService: ArchiveService,
	    protected AS: AboutService,
	    loaderService: AppLoaderService) {
        super(loaderService);
	    }

	    protected initializeData() {
	      this.AS.getAboutPage().subscribe(
	        pages => {
	        	this.about = pages[0];
	        	this.setCustomFields(this.about['custom_fields']);

	        	this.loaded();
	        	this.searchService.activate(Archive.article);
	       	});
	    }

		init() {
			this.initializeData();
		}

    /**
      Reads the custom fields of the about page and modifies the values for display.
      @param {object} customFields The about custom fields
    **/
		setCustomFields(customFields) {
		  this.aboutTheEditor = customFields['about-the-editor'];
		  this.feedbackText = customFields['feedback-text'];
		  this.leadEditorName = customFields['lead-editor-name'];
		  this.editorialYear = customFields['editorial-year'];
		  this.aboutTelephone = customFields['about-telephone'];
		  this.aboutEmail = customFields['about-email-address'];
		  this.visitorsAddress = customFields['visitors-address'];
		  this.postAddress = customFields['post-address'];
		}
}
