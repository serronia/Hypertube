import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { User } from '../_models';


@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.scss']
})


export class HeaderComponent {
currentUser: User;
    constructor(private router: Router,
				private authenticationService: AuthenticationService) {
						this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
						/*console.log("====== header =======");
						console.log(this.currentUser);
						console.log(localStorage);
						console.log("====== header =======");*/
						}

	logout() {
		this.authenticationService.logout();
//		this.router.navigate(['/login']);
	}

	testtok(){
		this.authenticationService.testtok(this.currentUser)
		.subscribe(data => {console.log(data);}, error => {console.log(error)});
	}
}
