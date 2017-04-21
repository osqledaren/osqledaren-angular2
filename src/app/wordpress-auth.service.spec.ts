/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WordpressAuthService } from './wordpress-auth.service';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordpressAuthService]
    });
  });

  it('should ...', inject([AuthService], (service: WordpressAuthService) => {
    expect(service).toBeTruthy();
  }));
});
