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
import { ReviewEspecificaComponent } from './components/review-especifica/review-especifica.component';
import { ReviewHistoryComponent } from './pages/review-history/review-history.component';
import { AddToListComponent } from './components/modals/add-to-list/add-to-list.component';
import { CreateListComponent } from './components/modals/create-list/create-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CreateReviewComponent } from './components/modals/create-review/create-review.component';
import { YourRatingComponent } from './components/your-rating/your-rating.component';
import { BtnReviewComponent } from './components/btn-review/btn-review.component';
import { BtnAddToListComponent } from './components/btn-add-to-list/btn-add-to-list.component';
import { FeaturedReviewsComponent } from './components/featured-reviews/featured-reviews.component';
import { CommentComponent } from './components/comment/comment.component';
import { ListsOfUserComponent } from './components/lists-of-user/lists-of-user.component';
import { StatTotalComponent } from './components/stat-total/stat-total.component';
import { ListenLikeWatchComponent } from './components/listen-like-watch/listen-like-watch.component';
import { SongsInListComponent } from './components/songs-in-list/songs-in-list.component';
import { DatosSongAlbumComponent } from './components/datos-song-album/datos-song-album.component';
import { BestUserComponent } from './components/best-user/best-user.component';
import { Error404Component } from './pages/error404/error404.component';
import { AlbumComponent } from './pages/album/album.component';
import { SongsOnAlbumComponent } from './components/songs-on-album/songs-on-album.component';
import { SongComponent } from './pages/song/song.component';
import { FollowingComponent } from './pages/following/following.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { AlbumsListenedComponent } from './pages/albums-listened/albums-listened.component';
import { ProfileDatosUserComponent } from './components/profile-datos-user/profile-datos-user.component';
import { profile } from 'console';
import { ProfileBioStatsComponent } from './components/profile-bio-stats/profile-bio-stats.component';
import { ProfileHistoryComponent } from './components/profile-history/profile-history.component';
import { ProfilePopularListsComponent } from './components/profile-popular-lists/profile-popular-lists.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SongHeardByComponent } from './pages/song-heard-by/song-heard-by.component';
import { SongLikedByComponent } from './pages/song-liked-by/song-liked-by.component';
import { AlbumHeardByComponent } from './pages/album-heard-by/album-heard-by.component';
import { AlbumLikedByComponent } from './pages/album-liked-by/album-liked-by.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { ComentsOnReviewComponent } from './pages/coments-on-review/coments-on-review.component';
import { ListComponent } from './pages/list/list.component';
import { ListLikedByComponent } from './pages/list-liked-by/list-liked-by.component';
import { ListenedOptionsComponent } from './components/modals/listened-options/listened-options.component';
import { ListsWithThisSongComponent } from './pages/lists-with-this-song/lists-with-this-song.component';

export const routes: Routes = [
    /* PAGINAS */
    { path: 'homepage', component: HomepageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profile/:id', component: ProfileComponent, pathMatch: 'full', data: { idPattern: '\\d+' } },
    { path: 'editProfile/:id', component: EditProfileComponent, pathMatch: 'full', data: { idPattern: '\\d+' } },
    { path: 'watchlist_songs/:id_user', component: WatchlistComponent, pathMatch: 'full', data: { idPattern: '\\d+' } },
    { path: 'watchlist_albums/:id_user', component: WatchlistComponent, pathMatch: 'full', data: { idPattern: '\\d+' } },
    { path: 'songsListened/:id_user', component: SongsListenedComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'albumsListened/:id_user', component: AlbumsListenedComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'bestUsers', component: BestUsersComponent},
    { path: 'rankedHistory/:id', component: RankedHistoryComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'reviewHistory/:id', component: ReviewHistoryComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: '404', component: Error404Component},
    { path: 'album/:id', component: AlbumComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'song/:id', component: SongComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'list/:id', component: ListComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'artist/:id', component: ArtistComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'following/:id', component: FollowingComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'followers/:id', component: FollowersComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'myLists/:id', component: MyListsComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'songHeardBy/:id', component: SongHeardByComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'songLikedBy/:id', component: SongLikedByComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'comentsOnReview/:type/:id', component: ComentsOnReviewComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id



    { path: 'albumHeardBy/:id', component: AlbumHeardByComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'albumLikedBy/:id', component: AlbumLikedByComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id

    { path: 'listLikedBy/:id', component: ListLikedByComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id
    { path: 'WithThisSong/:id', component: ListsWithThisSongComponent, pathMatch: 'full', data: { idPattern: '\\d+' } }, // Solo acepta números en :id


    /* COMPONENTES */
    // { path: 'navbarlogin', component: NavbarLoginComponent},
    // { path: 'navbarunlogin', component: NavbarUnloginComponent},
    // { path: 'welcome', component: WelcomeComponent},
    // { path: 'gridrow', component: GridrowComponent },
    // { path: 'encabezado', component: EncabezadoComponent},
    // { path: 'btnViewMore', component: BtnViewMoreComponent},
    // { path: 'btnReview', component: BtnReviewComponent},
    // { path: 'btnAddToList', component: BtnAddToListComponent},
    // { path: 'follows', component: FollowsComponent},
    // { path: 'rankedEspecifica', component: RankedEspecificaComponent},
    // { path: 'reviewEspecifica', component: ReviewEspecificaComponent},
    // { path: 'modalAddToList', component: AddToListComponent},
    // { path: 'modalCreateList', component: CreateListComponent},
    // { path: 'modalCreateReview', component: CreateReviewComponent},
    // { path: 'spinner', component: SpinnerComponent},
    // { path: 'yourRating', component: YourRatingComponent},
    // { path: 'featuredReviews', component: FeaturedReviewsComponent},
    // { path: 'comment', component: CommentComponent},
    // { path: 'listsOfUser', component: ListsOfUserComponent},
    // { path: 'statTotal', component: StatTotalComponent},
    // { path: 'listenLikeWatch', component: ListenLikeWatchComponent},
    // { path: 'songsInList', component: SongsInListComponent},
    // { path: 'datosSongAlbum', component: DatosSongAlbumComponent},
    // { path: 'bestUser', component: BestUserComponent},
    // { path: 'songsOnAlbum', component: SongsOnAlbumComponent},
    // { path: 'profileDatosUser', component: ProfileDatosUserComponent},
    // { path: 'profileBioStats', component: ProfileBioStatsComponent},
    // { path: 'profileHistory', component: ProfileHistoryComponent},
    // { path: 'profilePopularLists', component: ProfilePopularListsComponent},
    // { path: 'listenedOptions', component: ListenedOptionsComponent},

    { path: '**', pathMatch: 'full', redirectTo: '404' }
];



