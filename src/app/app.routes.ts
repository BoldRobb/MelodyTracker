import { Routes } from '@angular/router';
import { NavbarUnloginComponent } from './components/navbars/navbar-unlogin/navbar-unlogin.component';
import { NavbarLoginComponent } from './components/navbars/navbar-login/navbar-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GridrowComponent } from './components/gridrow/gridrow.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { BtnViewMoreComponent } from './components/btn-view-more/btn-view-more.component';
import { SongsListenedComponent } from './pages/songs-listened/songs-listened.component';
import { FollowsComponent } from './components/follows/follows.component';
import { BestUsersComponent } from './pages/best-users/best-users.component';
import { RankedEspecificaComponent } from './components/ranked-especifica/ranked-especifica.component';
import { RankedHistoryComponent } from './pages/ranked-history/ranked-history.component';

export const routes: Routes = [
    /* PAGINAS */
    { path: 'homepage', component: HomepageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'watchlist', component: WatchlistComponent},
    { path: 'songsListened', component: SongsListenedComponent},
    { path: 'bestUsers', component: BestUsersComponent},
    { path: 'rankedHistory', component: RankedHistoryComponent},




    /* COMPONENTES */
    { path: 'navbarlogin', component: NavbarLoginComponent},
    { path: 'navbarunlogin', component: NavbarUnloginComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'gridrow', component: GridrowComponent },
    { path: 'encabezado', component: EncabezadoComponent},
    { path: 'btnViewMore', component: BtnViewMoreComponent},
    { path: 'follows', component: FollowsComponent},
    { path: 'rankedEspecifica', component: RankedEspecificaComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'welcomelogin'}
];



