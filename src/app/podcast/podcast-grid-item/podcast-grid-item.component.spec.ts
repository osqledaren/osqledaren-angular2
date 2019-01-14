import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastGridItemComponent } from './podcast-grid-item.component';

describe('PodcastGridItemComponent', () => {
  let component: PodcastGridItemComponent;
  let fixture: ComponentFixture<PodcastGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
