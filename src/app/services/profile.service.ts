/**
 * Created by tarun on 17/7/17.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/';

import { AuthService } from './auth.service';

import { Profile } from '../models/profile.model';

import { Config } from '../config/config.config';

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private config: Config
  ) {

  }

  getUserByToken(token): Observable<Profile> {
    return this.http.get(
      `${this.config.apiV}/user/profile`,
      {}
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };
  createProfile(profile): Observable<Profile> {
    return this.http.post(
      `${this.config.apiV}/user/profile`,
      profile,
      {}
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  editProfile(profile: Profile): Observable<Profile> {
    return this.http.patch(
      `${this.config.apiV}/user/profile`,
      profile,
      {}
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
