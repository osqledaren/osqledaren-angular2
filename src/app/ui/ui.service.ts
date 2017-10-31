import {Injectable} from '@angular/core';
import {UI_ELEMENTS} from '../app.ui-elements';
import {State} from './ui-state.enum';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UIService {

  private e = UI_ELEMENTS;

  constructor() { }

  public toggle(element: string) {

    const state = this.getState(element).value;
    const newState = (state === State.closed) ? State.open : State.closed;
    this.e[element].element.state.next(newState);

  }

  public close(element: string) {

    this.e[element].element.state.next(State.closed);

  }

  public open(element: string) {

    this.e[element].element.state.next(State.open);

  }

  public getState(element): BehaviorSubject<State> {
    return this.e[element].element.state;
  }

}
