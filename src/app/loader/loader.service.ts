import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs/Rx";
import Dictionary from "typescript-collections/dist/lib/Dictionary";

@Injectable()
export class LoaderService {

  private collection: Dictionary<string, boolean>;
  private isLoaded: boolean = false;
  private timer;
  public loaded: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.collection = new Dictionary<string, boolean>();
    this.add('init');

    // Initial refresh with one second delay. Loader is always active on initialization.
    // Deactivate the loader if no component is using the loader during initialization.

    this.timer = Observable.timer(1000);
    this.timer.subscribe(t => {
      this.refresh();
    });
  }

  /**
   * Adds item to collection.
   * @param item
   */
  public add(item: string){
    this.collection.setValue(item, true);
    this.refresh();
  }

  /**
   * Removes item from collection.
   * @param item
   */
  public remove(item: string){
    this.collection.remove(item);
    this.refresh();
  }

  /**
   * Checks if item exists in collection.
   * @param item
   */
  public contains(item: string){
    return this.collection.containsKey(item);
  }

  /**
   * Flags loader as true if collection is empty.
   */
  private refresh(){

    if(this.collection.size() == 0){
      this.isLoaded = true;
      this.loaded.next(this.isLoaded);
    } else {
      this.loaded.next(false);
    }
  }
}
