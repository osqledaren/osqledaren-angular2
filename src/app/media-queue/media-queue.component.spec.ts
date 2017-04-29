/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MediaQueueComponent } from './media-queue.component';

describe('MediaQueueComponent', () => {
  let component: MediaQueueComponent;
  let fixture: ComponentFixture<MediaQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
