/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BroadcastLoaderComponent} from './broadcast-loader.component';

describe('BroadcastLoaderComponent', () => {
  let component: BroadcastLoaderComponent;
  let fixture: ComponentFixture<BroadcastLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BroadcastLoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
