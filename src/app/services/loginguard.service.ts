/**
 * Created by tarun on 19/7/17.
 */

import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.loginService.session.isActive) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
