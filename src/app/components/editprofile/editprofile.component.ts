import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { Config } from '../../config/config.config';

import { Profile } from '../../models/profile.model';

@Component({
  selector: 'edit-profile-app',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditProfileComponent {
  title = 'Profile';
  user = {};
  public fileUploader: FileUploader;
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    public profile: Profile,
    private config: Config
  ) {
    this.authService.getSession().then(session => {
      console.log('profile init', session.isActive);
      if ( session.isActive ) {
        this.profileService.getUserByToken(session.token.token).subscribe(res => {
          console.log(res);
          this.profile = res;
        });
      }
    });
    this.fileUploader = new FileUploader({
      url: `${this.config.apiBase}user/picture`
    });
    this.fileUploader.setOptions({
      authToken: `Bearer ${this.authService.token.token}`,
      itemAlias: 'file',
      additionalParameter: {file_type: 'profile'}
    });
  }

  editProfile() {
    console.log(this.profile);
    this.authService.getSession().then(session => {
      console.log('session', session.isActive);
      if ( session.isActive ) {
        this.profileService.editProfile(this.profile).subscribe(res => {
          console.log(res);
          this.profile = res;
          this.router.navigate(['/profile']);
        });
      }
    });
  }
}
