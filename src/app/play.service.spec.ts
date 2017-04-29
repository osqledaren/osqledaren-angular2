/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayService } from './play.service';

describe('Service: Play', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayService]
    });
  });

  it('should ...', inject([PlayService], (service: PlayService) => {
    expect(service).toBeTruthy();
  }));
});
