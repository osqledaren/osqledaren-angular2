import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MediaPlaylistSidebarComponent} from "./media-playlist-sidebar.component";

describe('MediaPlaylistSidebarComponent', () => {
  let component: MediaPlaylistSidebarComponent;
  let fixture: ComponentFixture<MediaPlaylistSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPlaylistSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlaylistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
