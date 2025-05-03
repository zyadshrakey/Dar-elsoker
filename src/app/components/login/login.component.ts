import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  JwksValidationHandler,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { IsLoaderService } from '../../services/loader/is-loader.service';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzImageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _Router: Router,
    private oauthService: OAuthService,
    private loading: IsLoaderService,
  ) {}

  src = `./assets/Untitled-1-01.png`;
  placeholder = `./assets/imageedit .png`;

  login() {
    this.oauthService.initCodeFlow();
    this.oauthService.initImplicitFlow();
    this._Router.navigate(['/dashboard']);
  }
}
