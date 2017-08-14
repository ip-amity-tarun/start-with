/**
 * Created by tarun on 14/7/17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  getParam(param: String): Promise<String> {
    return Promise.resolve(param);
  }
  setBodyClass(className): void {
    document.body.className = className;
  }
}
