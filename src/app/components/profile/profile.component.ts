import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'profile-app',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  title = 'Profile';
  constructor(
    private authService: AuthService,
    public user: User,
    public profile: Profile
  ) {
    this.authService.getSession().then(session => {
      console.log('profile init', session);
      if ( session.isActive ) {
        console.log('user', session.user);
        console.log('profile', session.profile);
        this.user = session.user;
        this.profile = session.profile;
      }
    });
  }
}
