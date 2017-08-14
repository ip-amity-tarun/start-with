import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { LoginService } from '../../services/login.service';

import {Token} from '../../models/token.model';

@Component({
  selector: 'signup-app',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  title = 'Signup';
  user = {};
  constructor(
    private signupService: SignupService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (this.loginService.session.isActive) {
      this.router.navigate(['/profile']);
    }
  }
  signup() {
    console.log(this.user);
    this.signupService.signup(this.user).subscribe(data => {
      console.log(data);
      const token =  data.json() as Token;
      this.loginService.startSession(token).then(session => {
        if ( session.isActive ) {
          console.log(session);
          this.router.navigate(['/profile']);
        }
      });
    });
  }
}
