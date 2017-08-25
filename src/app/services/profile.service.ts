/**
 * Created by tarun on 17/7/17.
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/';

import { AuthService } from './auth.service';

import { Profile } from '../models/profile.model';

import { Config } from '../config/config.config';

@Injectable()
export class ProfileService {

  constructor(
    private http: Http,
    private authService: AuthService,
    private config: Config
  ) {

  }

  getUserByToken(token): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(
      `${this.config.apiBase}user/profile`,
      options
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };
  createProfile(profile): Observable<Response> {
    const token = this.authService.getToken().token;
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(
      `${this.config.apiBase}user/profile`,
      profile,
      options
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  editProfile(profile: Profile): Observable<Response> {
    const token = this.authService.getToken().token;
    console.log('token', token, profile);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const options = new RequestOptions({ headers: headers });
    return this.http.patch(
      `${this.config.apiBase}user/profile`,
      profile,
      options
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
