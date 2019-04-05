import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = ' Angular ';
public lastUpdate = new Date();

constructor() {
setInterval(() => { this.lastUpdate = new Date();}, 1);
}
}
