import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.session.isActive) {
      this.router.navigate(['/profile']);
    }
  }
  login() {
    console.log(this.user);
    this.authService.login(this.user).subscribe(data => {
      const token =  data.json() as Token;
      this.authService.startSession(token).then(session => {
        console.log(session);
        this.router.navigate(['/profile']);
      });
    });
  }
}
