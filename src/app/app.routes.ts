import { Routes } from '@angular/router';
import { NavbarUnloginComponent } from './components/navbars/navbar-unlogin/navbar-unlogin.component';
import { NavbarLoginComponent } from './components/navbars/navbar-login/navbar-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomepageLoginComponent } from './components/homepages/homepage-login/homepage-login.component';
import { GridrowComponent } from './components/gridrow/gridrow.component';

export const routes: Routes = [
    { path: 'homepage', component: HomepageLoginComponent},

    { path: 'navbarlogin', component: NavbarLoginComponent},
    { path: 'navbarunlogin', component: NavbarUnloginComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'gridrow', component: GridrowComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'welcomelogin'}
];



