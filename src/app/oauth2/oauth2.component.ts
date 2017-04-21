import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {WordpressAuthService} from "../wordpress-auth.service";

@Component({
  selector: 'app-oauth2',
  templateUrl: 'oauth2.component.html',
  styleUrls: ['oauth2.component.scss']
})
export class OAuth2Component implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: WordpressAuthService) {}

  private authorize(qp){

    let state = '/';

    if (!isNullOrUndefined(qp['error'])) {
      //this.handleError(queryParams['error']);
      return;
    }

    if((!isNullOrUndefined(qp['state']))){
      state = qp['state'];
    }

    if (!isNullOrUndefined(qp['code'])) {
      this.auth.getAccessToken(qp['code']).subscribe((accessToken) => {
        this.router.navigate([state], {queryParams: {access_token: accessToken.token}});
      });
      return;
    }
  }

  ngOnInit(){

    this.route.queryParams.subscribe((queryParams) => this.authorize(queryParams));

  }

}
