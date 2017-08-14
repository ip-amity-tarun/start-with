import { Component } from '@angular/core';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'home-app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Home';
  constructor(private util: UtilService) {
    this.util.setBodyClass('home');
  }
}
