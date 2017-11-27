import {State} from './ui-state.enum';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface StateElement {
  id: string;
  states: [State];
  state;
}

export class UIElement {

  public element: StateElement;

  constructor(id, defaultState) {

    this.element = {
      id: id,
      states: [
        State.open,
        State.closed
      ],
      state: new BehaviorSubject(defaultState)
    };
  }
}
