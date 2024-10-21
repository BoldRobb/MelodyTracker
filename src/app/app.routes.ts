import { Routes } from '@angular/router';
import { NavbarUnloginComponent } from './components/navbars/navbar-unlogin/navbar-unlogin.component';
import { NavbarLoginComponent } from './components/navbars/navbar-login/navbar-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
    { path: 'navbarlogin', component: NavbarLoginComponent},
    { path: 'navbarunlogin', component: NavbarUnloginComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'welcomelogin'}
];
