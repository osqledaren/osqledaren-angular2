/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MediaPlaylistWidgetComponent} from './media-playlist-widget.component';

describe('MediaQueueComponent', () => {
  let component: MediaPlaylistWidgetComponent;
  let fixture: ComponentFixture<MediaPlaylistWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaPlaylistWidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlaylistWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
