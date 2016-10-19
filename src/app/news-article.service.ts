import {Injectable} from '@angular/core';
import {Article} from './article';
import {Articles} from './articles';

@Injectable()
export class NewsArticleService {

	constructor() {
	}

	public getAllNews(){
		return Articles;
	}

	public getNews(){}

}
