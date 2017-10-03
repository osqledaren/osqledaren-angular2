/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {MediaPlaylistService} from "./media-playlist.service";

describe('Service: MediaPlaylist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaPlaylistService]
    });
  });

  it('should ...', inject([MediaPlaylistService], (service: MediaPlaylistService) => {
    expect(service).toBeTruthy();
  }));
});
