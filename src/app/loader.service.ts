import { Injectable } from '@angular/core';
import {Dictionary} from "./shared/class/dictionary.class";
import {Subject, Observable} from "rxjs/Rx";

@Injectable()
export class LoaderService {

  private collection: Dictionary<boolean>;
  private isLoaded: boolean = false;
  private timer;
  public loaded: Subject<boolean> = new Subject;

  constructor() {
    this.collection = new Dictionary<boolean>();

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
    this.collection.add(item, true);
    this.refresh();
  }

  /**
   * Removes item from collection.
   * @param item
   */
  public remove(item: string){
    this.collection.remove('preload'); // Remove preload handle from queue.
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
    if(this.collection.values().length == 0){
      this.isLoaded = true;
      this.loaded.next(this.isLoaded);
    } else {
      this.loaded.next(false);
    }
  }
}
