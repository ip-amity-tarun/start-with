import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.session.isActive) {
      this.router.navigate(['/profile']);
    }
  }
  signup() {
    console.log(this.user);
    this.authService.signup(this.user).subscribe(data => {
      console.log(data);
      const token =  data.json() as Token;
      this.authService.startSession(token).then(session => {
        if ( session.isActive ) {
          console.log(session);
          this.router.navigate(['/profile']);
        }
      });
    });
  }
}
