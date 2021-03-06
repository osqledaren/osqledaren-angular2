import {Component, OnInit} from '@angular/core';
import {FooterService} from '../footer.service';
import {Page} from '../../content/page.interface';

@Component({
  selector   : 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls  : ['footer.component.scss']
})

export class FooterComponent implements OnInit {
  public footer: Page;
  public editorName;
  public editorEmail;
  public year;

  constructor(protected FS: FooterService) {}

  protected initializeData() {
    this.FS.getFooterPage().subscribe(
      pages => {
        this.footer = pages[0];
        this.setCustomFields(this.footer['custom_fields']);
      });
  }

  ngOnInit() {
    const today = new Date();
    this.year = today.getFullYear();

    this.initializeData();
  }

  /**
   Reads the custom fields of the footer page and modifies the values for display.
   @param {object} customFields The footers custom fields
   **/
  setCustomFields(customFields) {
    this.editorName = customFields['editor-name'];

    // replace '@' sign in the email address
    this.editorEmail = customFields['editor-email'].replace('@', ' at ');
  }
}
