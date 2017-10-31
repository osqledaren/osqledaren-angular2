import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {UIService} from './ui.service';
import {State, StateAction} from './ui-state.enum';

@Directive({
  selector: '[appUIElement]'
})
export class UIElementDirective {

  public element;

  @Input('app-ui-state-prefix') appUIStatePrefix;

  @Input('app-ui-element')
  public set appUIElement(element: string) {
    this.element = element;
    this.UI.getState(element).subscribe(state => {
      const stateVal = (this.appUIStatePrefix) ? this.appUIStatePrefix + '-' + State[state] : State[state];
      this.renderer.setAttribute(this.elementRef.nativeElement, 'data-state', stateVal);
    });
  }

  @Input('appUIElementAction')
  public set appUIElementAction(elementAction: StateAction) {
    this.setListener(elementAction);
  }

  constructor(public UI: UIService, private elementRef: ElementRef, private renderer: Renderer2) {}

  private setListener(elementAction) {

    const listener = 'click';

    let cb = (e) => {this.UI.toggle(e); }; // Set default action

    if (elementAction === StateAction.hover) {

      this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', (event) => this.UI.open(this.element));
      this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', (event) => this.UI.close(this.element));

    } else {
      switch (elementAction) {
        case StateAction.toggle:
          cb = (e) => {this.UI.toggle(e); };
          break;
        case StateAction.close:
          cb = (e) => {this.UI.close(e); };
          break;
        case StateAction.open:
          cb = (e) => {this.UI.open(e); };
          break;
      }

      this.renderer.listen(this.elementRef.nativeElement, listener, (event) => cb(this.element));

    }
  }

}
