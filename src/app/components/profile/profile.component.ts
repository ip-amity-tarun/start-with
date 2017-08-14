import { Component } from '@angular/core';

import { ProfileService } from '../../services/profile.service';
import { LoginService } from '../../services/login.service';

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
    private profileService: ProfileService,
    private loginService: LoginService,
    public user: User,
    public profile: Profile
  ) {
    this.loginService.getSession().then(session => {
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
