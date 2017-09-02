import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from '../services/auth.service';
import {Session} from '../models/session.model';

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
    private authService: AuthService
  ) {
    console.log('in app comp');
    router.events.filter(e => e instanceof NavigationStart).subscribe( e => {
      console.log('router event', router);
      this.pageUrl = e;
      this.authService.fetchToken().then(token => {
        if (token === null) {
          console.log('user logged out');
          return;
        }else {
          if (new Date(token.expire).getTime() > new Date().getTime()) {
            console.log('active user restart the session');
            this.authService.getSession().then((Session) => {});
          }else {
            console.log('refresh token');
          }
        }
      });
    });

  }
}
