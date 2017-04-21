import {environment} from "../environments/environment";
import {OpaqueToken} from "@angular/core";

// Generate configuration constant
export const APP_DI_CONFIG =
    (environment.production) ? {
            wordpressClientID: '',
            wordpressClientSecret: '',
            wordpressEndpoint: 'http://wp.osqledaren.se'
        } : ((environment.local) ?
            {
                // Important!!! Insert a virtual domain in your hosts file
                // pointing to the local wordpress installation.
                wordpressClientID: '8XNnWTa2qPe2Xa3R1o19WhdvoUt5Bi',
                wordpressClientSecret: 'jKf77c1her7tu5DxXEVYOSg1nFWQKx',
                wordpressEndpoint: 'http://osqledaren.dev'
            } : {
                wordpressClientID:'',
                wordpressClientSecret:'',
                wordpressEndpoint: 'http://wp-staging.osqledaren.se'
            });

// Initialize config with an Opaque Token
export let APP_CONFIG = new OpaqueToken('app.config');