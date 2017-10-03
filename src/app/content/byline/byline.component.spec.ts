/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BylineComponent } from './byline.component';

describe('BylineComponent', () => {
  let component: BylineComponent;
  let fixture: ComponentFixture<BylineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BylineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
