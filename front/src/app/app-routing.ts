import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }    from './page_not_found/page_not_found.component';
import { Home }    from './home/home.component';

const appRoutes: Routes = [
	{ 
		path: '',
		component: Home
	},
	{
		path: '**',
		component: PageNotFoundComponent
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes,{ enableTracing: true })
	],
	declarations: [
	],
	exports: [
		RouterModule
	]
})
export class AppRouting { }
