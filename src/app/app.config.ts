import {environment} from '../environments/environment';
import {OpaqueToken} from '@angular/core';

// Generate configuration constant
export const APP_DI_CONFIG =
    (environment.production) ? {
        wordpressEndpoint: '',
        superdeskEndpoint: '',
        respondCMSEndpoint: ''
    } :
    {
        wordpressEndpoint: 'http://wp-staging.osqledaren.se/wp-json/wp/v2',
        superdeskEndpoint: '',
        respondCMSEndpoint: ''
    }

// Initialize config with an Opaque Token
export let APP_CONFIG = new OpaqueToken('app.config');