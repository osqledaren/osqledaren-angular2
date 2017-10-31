import {Observable, Subject} from 'rxjs/Rx';
import Set from 'typescript-collections/dist/lib/Set';
import {GUID} from '../shared/guid.class';

export abstract class LoaderService {
  public reserved = {
    preload: new GUID()
  };
  public loaded: Subject<boolean> = new Subject<boolean>();
  private collection: Set<GUID> = new Set<GUID>();
  private timer;

  constructor() {

    // Initial delay before refresh

    this.timer = Observable.timer(1000);
    this.timer.subscribe(t => {
      this.refresh();
    });
  }

  /**
   * Adds item to collection.
   * @param item
   */
  public add(item: GUID) {
    this.collection.add(item);
    this.refresh();
  }

  /**
   * Checks if item exists in collection.
   * @param item
   */
  public contains(item: GUID) {
    return this.collection.contains(item);
  }

  /**
   * Removes reserved handles.
   */
  public loadComplete() {
    this.collection.remove(this.reserved.preload);
  }

  /**
   * Removes item from collection.
   * @param item
   */
  public remove(item: GUID) {
    this.collection.remove(item);
    this.refresh();
  }

  /**
   * Flags loader as true if collection is empty.
   */
  private refresh() {
    if (this.collection.isEmpty()) {
      this.loaded.next(true);
    } else {
      this.loaded.next(false);
    }
  }
}
