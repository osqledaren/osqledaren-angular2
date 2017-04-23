import {environment} from "../environments/environment";
import {OpaqueToken} from "@angular/core";

// Generate configuration constant
export const APP_DI_CONFIG =
    (environment.production) ? {
            wordpressOAuth2ClientName: 'osqledaren-angular2',
            wordpressEndpoint: 'http://wp.osqledaren.se'
        } : ((environment.local) ?
            {
                // Important!!! Insert a virtual domain in your hosts file
                // pointing to the local wordpress installation.
                wordpressOAuth2ClientName: 'osqledaren-angular2-dev',
                wordpressEndpoint: 'http://osqledaren.dev'
            } : {
                wordpressOAuth2ClientName: 'osqledaren-angular2-staging',
                wordpressEndpoint: 'http://wp-staging.osqledaren.se'
            });

// Initialize config with an Opaque Token
export let APP_CONFIG = new OpaqueToken('app.config');