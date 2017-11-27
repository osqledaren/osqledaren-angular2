/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {WordpressService} from './wordpress.service';

describe('Service: WordpressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordpressService]
    });
  });

  it('should ...', inject([WordpressService], (service: WordpressService) => {
    expect(service).toBeTruthy();
  }));
});
