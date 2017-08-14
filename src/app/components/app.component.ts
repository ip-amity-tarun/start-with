import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { LoginService } from '../services/login.service';
import {Session} from "../models/session.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Abc';
  pageUrl: any;
  constructor(
    public router: Router,
    private loginService: LoginService
  ) {
    console.log('in app comp');
    router.events.filter(e => e instanceof NavigationStart).subscribe( e => {
      console.log('router event', router);
      this.pageUrl = e;
      this.loginService.fetchToken().then(token => {
        if (token === null) {
          console.log('user logged out');
          return;
        }else {
          if (new Date(token.expire).getTime() > new Date().getTime()) {
            console.log('active user restart the session');
            this.loginService.getSession().then((Session) => {
              this.router.navigate(['/profile']);
            });
          }else {
            console.log('refresh token');
          }
        }
      });
    });

  }
}
