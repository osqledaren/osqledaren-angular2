/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {AppLoaderService} from './app-loader.service';

describe('Service: Loader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLoaderService]
    });
  });

  it('should ...', inject([AppLoaderService], (service: AppLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
