import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hospital';
  isSpecial = true;
  countries: any = ['India', 'China', 'USA'];
  country;
  onClick() {
    this.isSpecial = !this.isSpecial;
  }
}
