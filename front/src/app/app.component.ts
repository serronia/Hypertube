import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title : string = 'Hypertube';
  public lastUpdate = new Date();

  constructor() {
    setInterval(() => { this.lastUpdate = new Date();}, 1);
  }
}
