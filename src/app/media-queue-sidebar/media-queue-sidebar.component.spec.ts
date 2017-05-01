import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaQueueSidebarComponent } from './media-queue-sidebar.component';

describe('MediaQueueSidebarComponent', () => {
  let component: MediaQueueSidebarComponent;
  let fixture: ComponentFixture<MediaQueueSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaQueueSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaQueueSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
