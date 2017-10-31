import {Directive, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import {UIService} from './ui.service';
import {State} from './ui-state.enum';

@Directive({
  selector: '[app-ui-mirror-element]'
})
export class UIMirrorElementDirective {

  @Input('app-ui-state-prefix') appUIStatePrefix;

  @Input('app-ui-mirror-element')
  public set appUIMirrorElement(element: string) {
    this.UI.getState(element).subscribe(state => {

      const stateVal = (this.appUIStatePrefix) ? this.appUIStatePrefix + '-' + State[state] : State[state];

      this.renderer.setAttribute(this.elementRef.nativeElement, 'data-state', stateVal);
    });
  }

  constructor(private UI: UIService, private elementRef: ElementRef, private renderer: Renderer2) {}

}
