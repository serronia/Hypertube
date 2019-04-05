import { Component, OnInit } from '@angular/core';

@Component({
selector: 'w-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.scss']
})
export class Home implements OnInit {
public lastUpdate = new Date();

constructor() {
setInterval(() => { this.lastUpdate = new Date();}, 1);
}

ngOnInit() {
}
}
