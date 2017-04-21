import {Injectable, Inject} from "@angular/core";
import {APP_CONFIG} from "./app.config";
import {Http, Headers} from "@angular/http";
import {ContentService} from "./shared/abstract/abstract.content.service";
import {AccessToken} from "./shared/interface/access-token.interface";
import {DOCUMENT} from "@angular/platform-browser";

@Injectable()

/**
 * OAuth 2.0 using authentication code method.
 */

export class WordpressAuthService extends ContentService {
    private clientID;
    private clientSecret;
    private callbackUrl = this.document.location.protocol + '//' + this.document.location.host + '/oauth2';

    constructor(protected http: Http,
                @Inject(APP_CONFIG) config,
                @Inject(DOCUMENT) private document: Document) {
        super();
        this.clientID = config.wordpressClientID;
        this.clientSecret = config.wordpressClientSecret;
        this.endpoint = config.wordpressEndpoint + '/oauth';
    }

    public authenticate(state: string) {

        let authorizeUrl = this.endpoint + '/authorize/?redirect_uri=' +
            this.callbackUrl + '&state=' + state + '&response_type=code&client_id=' + this.clientID;

        window.location.href = authorizeUrl;
    }

    /**
     * Retrieves legitimate access token from server using a provided authorization code.
     * @param stateUrl
     * @param authCode
     * @returns {Observable<R|T>}
     */
    public getAccessToken(authCode: string) {

        let headers: Headers = new Headers();
        let data = 'grant_type=authorization_code&code=' + authCode + '&redirect_uri=' + this.callbackUrl;

        headers.append("Authorization", "Basic " + btoa(this.clientID + ":" + this.clientSecret));
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        return this.http.post(this.endpoint + '/token/', data, {headers: headers})
            .map((res) => this.map(res))
            .catch(this.handleError);

    }

    public map(res) {
        let parsed = res.json();

        let accessToken = <AccessToken>{
            token: parsed.access_token,
            refreshToken: parsed.refresh_token,
            type: parsed.token_type,
            expires: parsed.expires_in,
            fetched: new Date().getTime() / 1000
        };

        return accessToken;
    }

}
