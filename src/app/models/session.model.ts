/**
 * Created by tarun on 18/7/17.
 */
import { Injectable } from '@angular/core';


import { Token } from './token.model';
import { User } from './user.model';
import { Profile } from './profile.model'

@Injectable()
export class Session {
  isActive: boolean;
  token: Token;
  user: User;
  profile: Profile;
}
