/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MediaQueueService } from './media-queue.service';

describe('Service: MediaQueue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueueService]
    });
  });

  it('should ...', inject([MediaQueueService], (service: MediaQueueService) => {
    expect(service).toBeTruthy();
  }));
});
