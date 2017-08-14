/**
 * Created by tarun on 18/7/17.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class Token {
  token: string;
  expire: Date;
}
