import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerfrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService)
    {}

  ngOnInit() {
    this.registerfrom = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      mail: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerfrom.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerfrom.invalid) {
          return;
      }

		this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value, this.f.password2.value, this.f.mail.value)
      .subscribe(
      data => 
      {
          console.log("register ok = ", data);
          this.router.navigate([this.returnUrl]);
          
      },
      error => {
          console.log("register error = ", error);
          console.log(error.error);
          this.error = error.error;
          this.loading = false;
      });
    }
}

