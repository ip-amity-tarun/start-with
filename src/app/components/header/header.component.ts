import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'header-app',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Header';
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  logout() {
    this.authService.logout().then((data) => {
      this.router.navigate(['/']);
    })
  }
}
