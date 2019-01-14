import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastGridComponent } from './podcast-grid.component';

describe('PodcastGridComponent', () => {
  let component: PodcastGridComponent;
  let fixture: ComponentFixture<PodcastGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
