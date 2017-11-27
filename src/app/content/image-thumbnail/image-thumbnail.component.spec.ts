/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleImageThumbnailComponent} from './image-thumbnail.component';

describe('ArticleImageThumbnailComponent', () => {
  let component: ArticleImageThumbnailComponent;
  let fixture: ComponentFixture<ArticleImageThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleImageThumbnailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleImageThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
