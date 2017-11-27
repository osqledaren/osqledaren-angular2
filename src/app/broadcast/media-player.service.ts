import {Injectable} from '@angular/core';
import {Episode} from './episode.interface';
import {VgAPI} from 'videogular2/src/core/services/vg-api';
import {Subject} from 'rxjs/Subject';
import {isNullOrUndefined} from 'util';

@Injectable()
export class MediaPlayerService {

  public api: VgAPI = undefined;
  public current: Subject<Episode> = new Subject<Episode>();

  constructor() {
  }

  public load(episode: Episode) {
    if (isNullOrUndefined(episode) || !this.isReady()) {
      return
    }
    ;
    this.current.next(episode);
  }

  private isReady(): boolean {
    return !isNullOrUndefined(this.api);
  }

}
