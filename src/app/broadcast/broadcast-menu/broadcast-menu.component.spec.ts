import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMenuComponent } from './broadcast-menu.component';

describe('BroadcastMenuComponent', () => {
  let component: BroadcastMenuComponent;
  let fixture: ComponentFixture<BroadcastMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
