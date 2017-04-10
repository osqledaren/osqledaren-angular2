import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlayHeaderCommunicationService {
  private notify = new Subject<any>();

  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();

  constructor() { }

  //Service message commands
  updateHeaderQueue(){
    this.notify.next();
  }

}
