import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

import {Token} from '../../models/token.model';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Login';
  user = {};
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    if (this.loginService.session.isActive) {
      this.router.navigate(['/profile']);
    }
  }
  login() {
    console.log(this.user);
    this.loginService.login(this.user).subscribe(data => {
      const token =  data.json() as Token;
      this.loginService.startSession(token).then(session => {
        console.log(session);
        this.router.navigate(['/profile']);
      });
    });
  }
}
