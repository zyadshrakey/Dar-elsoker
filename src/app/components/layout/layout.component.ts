import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { initFlowbite } from 'flowbite';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzLayoutModule,
    NzPopconfirmModule,
    NzModalModule,
  ],
  providers: [RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(
    private _OAuthService: OAuthService,
    private _Route: Router,
    private nzMessageService: NzMessageService,
    private modal: NzModalService
  ) {}

  govisits() {
    this._Route.navigate(['/cases'], {
      queryParams: { status: 'ALL' },
    });
  }

  signOut() {
    this.modal.confirm({
      nzTitle: 'هل انت متاكد من تسجيل الخروج ؟',
      nzOkText: 'نعم',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this._OAuthService.revokeTokenAndLogout();
        this._OAuthService.logOut();
        this._Route.navigate(['/login']),
          this.nzMessageService.success('تم تسجيل الخروج');
        localStorage.clear();
      },
      nzCancelText: 'لا',
    });
  }
}
