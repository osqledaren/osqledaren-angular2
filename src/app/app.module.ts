import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SearchComponent} from './search/search.component';
import {NavigationService} from './navigation.service';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		SearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [NavigationService],
	bootstrap: [HeaderComponent, FooterComponent]
})
export class AppModule {
}
