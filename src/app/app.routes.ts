import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

//Auth Guards
import { AuthGuard } from './auth/auth.guard'; // AuthGuard generico (para todos los ro

//Routes de la app
const APP_ROUTES: Routes = [
	{ path: 'home', canActivate:[AuthGuard], component: HomeComponent, data: {roles: ['all']}},
	{ path: 'login', component: LoginComponent },
	{ path: 'profile', canActivate:[AuthGuard], component: ProfileComponent, data: {roles: ['all']}},
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });