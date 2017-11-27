import { TestBed, inject } from '@angular/core/testing';

import { FacebookVideoService } from './facebook-video.service';

describe('FacebookVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookVideoService]
    });
  });

  it('should be created', inject([FacebookVideoService], (service: FacebookVideoService) => {
    expect(service).toBeTruthy();
  }));
});
