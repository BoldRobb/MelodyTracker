import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';  // Importa el servicio
import { SpinnerService } from '../../services/others/spinner.service';  // Si usas el servicio Spinner
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { ListenLikeWatchComponent } from "../../components/listen-like-watch/listen-like-watch.component";
import { YourRatingComponent } from "../../components/your-rating/your-rating.component";
import { BtnReviewComponent } from "../../components/btn-review/btn-review.component";
import { SongsOnAlbumComponent } from "../../components/songs-on-album/songs-on-album.component";
import { FeaturedReviewsComponent } from "../../components/featured-reviews/featured-reviews.component";
import { CommentComponent } from "../../components/comment/comment.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component"; // Importa el componente standalone

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  standalone: true,  // Hacemos que el componente sea standalone
  imports: [DatosSongAlbumComponent, ListenLikeWatchComponent, YourRatingComponent, BtnReviewComponent, SongsOnAlbumComponent, FeaturedReviewsComponent, CommentComponent, BtnViewMoreComponent] 
})
export class AlbumComponent{
  
}