import {AppConfig} from "./model/config.ts";

import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MasonryModule} from 'angular2-masonry/src/module';
import {OpaqueToken} from '@angular/core';

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SearchComponent} from "./search/search.component";
import {ArticleComponent} from "./article/article.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ArticleGridComponent} from "./article-grid/article-grid.component";
import {ArticleGridItemComponent} from "./article-grid-item/article-grid-item.component";

// Generate configuration constant
export const APP_DI_CONFIG: AppConfig = {
	wordpressEndpoint: 'test',
	superdeskEndpoint: 'test',
	respondCMSEndpoint: ''
};

// Initialize config with an Opaque Token
export let APP_CONFIG = new OpaqueToken('app.config');

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		SearchComponent,
		ArticleComponent,
		HomeComponent,
		PageNotFoundComponent,
		ArticleGridComponent,
		ArticleGridItemComponent
	],
	imports: [
		NgbModule.forRoot(),
		MasonryModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([
			{path: 'article/:id', component: ArticleComponent},
			{path: '', component: HomeComponent},
			{path: '**', component: PageNotFoundComponent}
		])
	],
	providers: [{provide: APP_CONFIG, useValue: APP_DI_CONFIG}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
