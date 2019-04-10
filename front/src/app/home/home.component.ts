import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public lastUpdate = new Date();

    constructor() {
    setInterval(() => { this.lastUpdate = new Date();}, 1);
    }

    ngOnInit() {
    }
}
