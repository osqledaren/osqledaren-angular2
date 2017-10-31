/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {BroadcastLoaderService} from './broadcast-loader.service';

describe('Service: Loader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcastLoaderService]
    });
  });

  it('should ...', inject([BroadcastLoaderService], (service: BroadcastLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
