import { Component } from '@angular/core';
import { DatosSongAlbumComponent } from "../../components/datos-song-album/datos-song-album.component";
import { CommentComponent } from "../../components/comment/comment.component";

@Component({
  selector: 'app-coments-on-review',
  standalone: true,
  imports: [DatosSongAlbumComponent, CommentComponent],
  templateUrl: './coments-on-review.component.html',
  styleUrl: './coments-on-review.component.css'
})
export class ComentsOnReviewComponent {

}
