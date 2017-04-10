/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayHeaderCommunicationService } from './play-header-communication.service';

describe('Service: PlayHeaderCommunication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayHeaderCommunicationService]
    });
  });

  it('should ...', inject([PlayHeaderCommunicationService], (service: PlayHeaderCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
