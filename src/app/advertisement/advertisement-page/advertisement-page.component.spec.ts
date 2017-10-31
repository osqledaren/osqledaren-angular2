/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvertisementPageComponent} from './advertisement-page.component';

describe('AdvertisementPageComponent', () => {
  let component: AdvertisementPageComponent;
  let fixture: ComponentFixture<AdvertisementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
