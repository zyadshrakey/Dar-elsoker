import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const myhttpInterceptor: HttpInterceptorFn = (req, next) => {
  const oAuthService = inject(OAuthService);
  const token = localStorage.getItem('_token');

  if (oAuthService.getAccessToken() && token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
