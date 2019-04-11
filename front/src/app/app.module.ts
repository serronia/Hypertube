import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { FilmComponent } from './film/film.component';
import { AppRouting } from './app.routing';

import { PageNotFoundComponent } from './page_not_found/page_not_found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_services';
import { PageFilmComponent } from './page-film/page-film.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRouting,
    MatCardModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FilmComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    PageFilmComponent,
    RegisterComponent,
    SettingsComponent
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
