import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-submenu',
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss']
})
export class HeaderSubmenuComponent implements OnInit {
	@Input() isCollapsed: boolean;

  	constructor(private elementView: ElementRef) {}

  	public MenuHeight: number;

  	public getMenuHeight(){
  		console.log(this.elementView.nativeElement.offsetHeight);
  		if (this.elementView.nativeElement.offsetHeight > 0) {
				this.MenuHeight = this.elementView.nativeElement.offsetHeight;
			}
	    
	}

	setHeight(el, height) {
	    //this.renderer.setElementStyle(el, 'height', height + 'px');
	  }

	setMenuHeight() {
		if (this.isCollapsed) {
			return 0
		} else {
			return this.MenuHeight
		}
	}

	notifyMe() {
		console.log("Event fired");
		setTimeout(() => {
			console.log(this.elementView.nativeElement.offsetHeight);
			console.log("menuheight", this.MenuHeight);
			if (this.elementView.nativeElement.offsetHeight > 0) {
				//this.MenuHeight = this.elementView.nativeElement.offsetHeight;
			}
		}, 200);
		
	}

  	ngOnInit() {
  		console.log(this);
  		this.getMenuHeight();

  		if (this.isCollapsed) {
  			console.log("YOYOY");
  		} else {
  			console.log("nnnn");
  		}
  	}

}
