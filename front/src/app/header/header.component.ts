import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.scss']
})

export class Header {
isAuth = true;
logout(): void {
    this.isAuth = false;
	}
	login(): void {
	this.isAuth = true;
}
}
