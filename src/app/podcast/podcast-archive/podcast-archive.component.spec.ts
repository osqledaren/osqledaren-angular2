import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastArchiveComponent } from './podcast-archive.component';

describe('PodcastArchiveComponent', () => {
  let component: PodcastArchiveComponent;
  let fixture: ComponentFixture<PodcastArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
