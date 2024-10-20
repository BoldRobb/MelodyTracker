import { Routes } from '@angular/router';
import { NavbarUnloginComponent } from './components/navbars/navbar-unlogin/navbar-unlogin.component';
import { NavbarLoginComponent } from './components/navbars/navbar-login/navbar-login.component';

export const routes: Routes = [
    { path: '', component: NavbarLoginComponent},
    { path: 'asd', component: NavbarUnloginComponent},
    { path: '**', pathMatch: 'full', redirectTo: ''}
];
