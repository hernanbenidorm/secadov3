import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any;
  slidesOptions: any;

  constructor(public navCtrl: NavController) {
    this.items = [];

    this.slidesOptions = {
      loop: true,
      autoplay: 1000,
      pager: true,
    }

  }

  onClick() {
    this.items = [{
      name: 'Slide 1',
    }, {
      name: 'Slide 2',
    }, {
      name: 'Slide 3',
    }];
  }

}
