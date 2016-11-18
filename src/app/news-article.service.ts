import {Injectable} from '@angular/core';
import {Articles} from './mock/articles';
import {Article} from './model/article';
import {WordpressService} from './wordpress.service';

@Injectable()
export class NewsArticleService {

	public getAllNews(): Article[]{

		return Articles;
	}

	public getNews(){}

}
