import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrincipalComponent } from './principal/principal.component';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { PageNotFoundComponent } from './page_not_found/page_not_found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_services';

@NgModule({
  imports: [
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  AppRouting
  ],
  declarations: [
  AppComponent,
  PageNotFoundComponent,
  HomeComponent,
  HeaderComponent,
  LoginComponent
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
