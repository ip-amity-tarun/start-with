import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'create-profile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateProfileComponent {
  title = 'Profile';
  profile = {contact: [], skill_category: []};
  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.addContact();
  }
  createProfile() {
    console.log(this.profile);
    this.loginService.getSession().then(session => {
      console.log('session', session.isActive);
      if ( session.isActive ) {
        this.profileService.createProfile(this.profile).subscribe(res => {
          console.log(res);
          this.profile = res.json().profile;
          this.router.navigate(['/profile']);
        });
      }
    });
  }
  addContact(): void {
    this.profile.contact.push({phone_number: '', phone_type: ''})
  }

  removeContact(i: number): void {
    this.profile.contact.splice(i, 1);
  }
}
