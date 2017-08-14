/**
 * Created by tarun on 17/7/17.
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/';

import { Config } from '../config/config.config';

@Injectable()
export class SignupService {

  constructor(
    private http: Http,
    private config: Config
  ) {

  }

  signup(user): Observable<Response> {

    const body = JSON.stringify({ user });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this.http.post(
      `${this.config.apiBase}register`,
      user,
      options
    ).map((res: Response) => res).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };
}
