import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../_services';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
		private authenticationService: AuthenticationService,
		private title: Title
		) { 
		 this.title.setTitle("Hypertube - Login");
		}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

		// get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	
		const id = this.route.snapshot.queryParams['id'] || '';
		const username = this.route.snapshot.queryParams['username'] || '';
		const token = this.route.snapshot.queryParams['token'] || '';
		if (id && username && token)
			this.authenticationService.verifi_tok(id, username, token)
			.subscribe(data => { console.log(data);
				this.router.navigate([this.returnUrl]);
			},
			error => {
				this.router.navigate(['/login']);
			});
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

		this.loading = true;
		if (!this.authenticationService.isLoggedIn())
		{
	        this.authenticationService.login(this.f.username.value, this.f.password.value)
   	         .subscribe(
					data => {
						console.log("login-co ponent data");
						if (data)
							this.router.navigate([this.returnUrl]);
						else
						{
							this.loading = false;
							this.error = "No token";
						}
	        	    },
	            	error => {
						console.log("login-co ponent error");
						console.log(error);
						if (error.status == 400)
	                   		this.error = error.error;
						else
							this.error = error.statusText; 
	                    this.loading = false;
				});
		}
    }
}

