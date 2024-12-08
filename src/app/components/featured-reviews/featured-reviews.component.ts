import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/others/spinner.service';
import { SongService } from '../../services/song/backend/song.service';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-reviews.component.html',
  styleUrls: ['./featured-reviews.component.css']
})
export class FeaturedReviewsComponent implements OnInit {
  // Variables para determinar qué tipo de vista mostrar
  isSong: boolean = false;
  isAlbum: boolean = false;
  isList: boolean = false;

  // Variable para almacenar los reviews
  topReviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    this.isSong = currentUrl.includes('song');
    this.isAlbum = currentUrl.includes('album');
    this.isList = currentUrl.includes('list');

    if (this.isSong) {
      this.route.params.subscribe(params => {
        const songId = +params['id'];
        this.getTopReviews(songId);
      });
    } else if (this.isAlbum) {
      this.route.params.subscribe(params => {
        const albumId = +params['id'];
        this.getTopReviewsForAlbum(albumId);
      });
    } else if (this.isList) {
      this.route.params.subscribe(params => {
        const listId = +params['id'];
        this.getTopReviewsForList(listId);
      });
    }
  }

  getTopReviews(songId: number): void {
    this.spinnerService.show();
    this.songService.getTopReviews(songId)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe(
        (reviews) => {
          this.topReviews = reviews;
        },
        (error) => {
          console.error('Error al obtener los reviews:', error);
        }
      );
  }

  getTopReviewsForAlbum(albumId: number): void {
    this.spinnerService.show();
    this.songService.getTopReviewsAlbums(albumId)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe(
        (reviews) => {
          this.topReviews = reviews;
        },
        (error) => {
          console.error('Error al obtener los reviews del álbum:', error);
        }
      );
  }

  getTopReviewsForList(listId: number): void {
    this.spinnerService.show();
    this.songService.getTopReviewsLists(listId)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe(
        (reviews) => {
          this.topReviews = reviews;
        },
        (error) => {
          console.error('Error al obtener los reviews de la lista:', error);
        }
      );
  }

  // Método para obtener las estrellas completas según el score
  getFullStars(score: number): number[] {
    const fullStars = Math.floor(score);
    return new Array(fullStars).fill(1);
  }

  // Método para obtener las estrellas medias según el score
  getHalfStar(score: number): boolean {
    return score % 1 !== 0;
  }
}
