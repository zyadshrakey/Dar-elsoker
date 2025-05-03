import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  AuthConfig,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { myhttpInterceptor } from './interceptors/http/myhttp.interceptor';
import { loaderInterceptor } from './interceptors/loader/loader.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://outh.ebdaa-business.com/realms/dar-elsokar',
  tokenEndpoint:
    'https://outh.ebdaa-business.com/realms/dar-elsokar/protocol/openid-connect/token',
  // postLogoutRedirectUri: 'http://66.29.130.92:5055/login',
  postLogoutRedirectUri: window.location.origin + '/login',
  // redirectUri: 'http://66.29.130.92:5055/dashboard',
  redirectUri: window.location.origin + '/dashboard',
  clientId: 'dar-elsokar-frontend',
  responseType: 'code',
  scope: 'openid profile roles',
  showDebugInformation: true,
};

export const initializeOAuth = (oauthService: OAuthService) => {
  oauthService.configure(authCodeFlowConfig);
  oauthService
    .loadDiscoveryDocumentAndTryLogin()
    .then(() => {
      const token = oauthService.getAccessToken() || '';
      const name = oauthService.getIdentityClaims()['name'] || '';
      localStorage.setItem('_token', token);
      localStorage.setItem('_name', name);
    })
    .catch(console.error);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideClientHydration(),
    provideHttpClient(withInterceptors([loaderInterceptor, myhttpInterceptor])),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        };
      },
      multi: true,
      deps: [OAuthService],
    },
    provideNzI18n(en_US),
  ],
};
