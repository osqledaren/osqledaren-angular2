/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {NewsArticleService} from './news-article.service';

describe('Service: NewsArticle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsArticleService]
    });
  });

  it('should ...', inject([NewsArticleService], (service: NewsArticleService) => {
    expect(service).toBeTruthy();
  }));
});
