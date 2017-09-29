/**
 * Created by tarun on 6/9/17.
 */
import { Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { LocalStorageService } from 'angular-2-local-storage';
import { Config } from '../config/config.config';
import {Token} from '../models/token.model';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(
    private config: Config,
    private localStorageService: LocalStorageService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: Token = this.localStorageService.get('token') as Token;

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token.token) });
    }

    /*if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }*/
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    req = req.clone({url: this.config.apiBase + req.url});
    return next.handle(req);
  }
}
