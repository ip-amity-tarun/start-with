import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'header-app',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Header';
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }
  logout() {
    this.loginService.logout().then((data) => {
      this.router.navigate(['/']);
    })
  }
}
