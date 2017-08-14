/**
 * Created by tarun on 18/7/17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Profile {
  id: string;
  info: string;
  height: string;
  weight: string;
  BodyType: string;
  Complexion: string;
  Ethinicity: string;
  skill_category: Array<string>;
  contact: Array<any>;
}
