import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

//Auth Guards
import { AuthGuard } from './auth/auth.guard'; // AuthGuard generico (para todos los roles)
// import { AuthGuardAdmin } from './auth/authAdmin.guard';
// import { AuthGuardPaciente } from './auth/authPaciente.guard';
// import { AuthGuardMedico } from './auth/authMedico.guard';

//Routes de la app
const APP_ROUTES: Routes = [
	{ path: 'home', canActivate:[AuthGuard],component: HomeComponent},
	{ path: 'login', component: LoginComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });