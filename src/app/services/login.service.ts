/**
 * Created by tarun on 16/7/17.
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/';
import { LocalStorageService } from 'angular-2-local-storage';

import { Token } from '../models/token.model';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';
import { Config } from '../config/config.config';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    public token: Token,
    public session: Session,
    private config: Config
  ) {
    this.token = new Token();
  }

  login(user): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(
      `${this.config.apiBase}login`,
      user,
      options
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  saveToken(token: Token): boolean {
    return this.localStorageService.set('token', token);
  };
  saveUser(user: User): boolean {
    return this.localStorageService.set('user', user);
  }
  saveProfile(profile: Profile): boolean {
    return this.localStorageService.set('profile', profile);
  }
  getToken(): Token {
    return this.localStorageService.get('token') as Token ;
  }
  getUser(): User {
    return this.localStorageService.get('user') as User;
  }
  getProfile(): Profile {
    return this.localStorageService.get('profile') as Profile;
  }
  fetchToken(): Promise<any> {
    return Promise.resolve(this.localStorageService.get('token'));
  }

  refreshToken(): void {

  };

  getUserByToken(token): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(
      `${this.config.apiBase}user/profile`,
      options
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };
  startSession(token: Token): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.saveToken(token);
      this.token = token;
      this.session.token = token;
      this.session.isActive = true;
      this.getUserByToken(this.token.token).subscribe((res) => {
        this.session.user = res.json().user;
        this.session.profile = res.json().profile;
        this.saveUser(this.session.user);
        this.saveProfile(this.session.profile);
        console.log('session in start', this.session);
        resolve(this.session);
      });
    });

  };
  getSession(): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.session.token = this.getToken();
      this.session.isActive = true;
      this.session.user = this.getUser();
      this.session.profile = this.getProfile();
      resolve(this.session);
    });
  };
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.session = new Session();
      this.token = new Token();
      this.localStorageService.clearAll();
      resolve(true);
    });
  }
}
