import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

//Routes de la app
const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent},
	{ path: 'login', component: LoginComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });