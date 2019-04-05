import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app-routing';

import { PageNotFoundComponent } from './page_not_found/page_not_found.component';
import { Home } from './home/home.component';
import { Header } from './header/header.component';

@NgModule({
  imports: [
  BrowserModule,
  AppRouting
  ],
  declarations: [
  AppComponent,
  PageNotFoundComponent,
  Home,
  Header
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
