/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrintedIssuesGridComponent} from './printed-issues-grid.component';

describe('PrintedIssuesGridComponent', () => {
  let component: PrintedIssuesGridComponent;
  let fixture: ComponentFixture<PrintedIssuesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintedIssuesGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintedIssuesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
