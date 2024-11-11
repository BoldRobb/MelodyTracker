import { Component } from '@angular/core';
import { DatosSongAlbumComponent } from "../../components/datos-song-album/datos-song-album.component";
import { SongsOnAlbumComponent } from "../../components/songs-on-album/songs-on-album.component";
import { FeaturedReviewsComponent } from "../../components/featured-reviews/featured-reviews.component";
import { ListenLikeWatchComponent } from "../../components/listen-like-watch/listen-like-watch.component";
import { YourRatingComponent } from "../../components/your-rating/your-rating.component";
import { BtnReviewComponent } from "../../components/btn-review/btn-review.component";
import { CommentComponent } from "../../components/comment/comment.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { BtnAddToListComponent } from "../../components/btn-add-to-list/btn-add-to-list.component";

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [DatosSongAlbumComponent, SongsOnAlbumComponent, FeaturedReviewsComponent, ListenLikeWatchComponent, YourRatingComponent, BtnReviewComponent, CommentComponent, BtnViewMoreComponent, BtnAddToListComponent],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {

}
