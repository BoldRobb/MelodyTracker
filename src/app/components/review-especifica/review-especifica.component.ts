import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/others/spinner.service';
import { UsersService } from '../../services/users/backend/users.service';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { catchError, of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-review-especifica',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './review-especifica.component.html',
  styleUrls: ['./review-especifica.component.css']
})
export class ReviewEspecificaComponent implements OnInit {
  idUser!: number;
  combinedReviews: any[] = [];
  filteredReviews: any[] = [];
  selectedFilter: string = '';  // Filtro seleccionado

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.idUser = +this.activatedRoute.snapshot.paramMap.get('id')!;
    
    // Realizar la llamada a las APIs para obtener las reseñas
    forkJoin([
      this.usersService.getReviewsHistory(this.idUser).pipe(catchError(() => of({ reviews_history: [] }))),
      this.usersService.getReviewsHistoryAlbums(this.idUser).pipe(catchError(() => of({ reviews_history_albums: [] }))),
      this.usersService.getReviewsHistoryLists(this.idUser).pipe(catchError(() => of({ reviews_history_lists: [] })))
    ]).pipe(
      finalize(() => this.spinnerService.hide())
    ).subscribe(
      ([songs, albums, lists]) => {
        // Unir todas las reseñas en un solo array
        this.combinedReviews = [
          ...songs.reviews_history,
          ...albums.reviews_history_albums,
          ...lists.reviews_history_lists
        ];

        // Ordenarlas por fecha de revisión
        this.combinedReviews.sort((a, b) => new Date(b.date_review).getTime() - new Date(a.date_review).getTime());
        
        // Filtrar las reseñas según el filtro seleccionado
        this.filterReviews();
      },
      error => {
        console.error('Error al obtener reseñas:', error);
      }
    );
  }

  // Aplicar el filtro seleccionado
  applyFilter(filter: string): void {
    this.selectedFilter = filter;
    this.filterReviews();  // Filtrar las reseñas
  }

  // Filtrar las reseñas según el filtro seleccionado
  filterReviews(): void {
    if (this.selectedFilter === 'song') {
      this.filteredReviews = this.combinedReviews.filter(review => review.id_song);
    } else if (this.selectedFilter === 'album') {
      this.filteredReviews = this.combinedReviews.filter(review => review.id_album);
    } else if (this.selectedFilter === 'list') {
      this.filteredReviews = this.combinedReviews.filter(review => review.id_list);
    } else {
      this.filteredReviews = this.combinedReviews;  // Si no hay filtro, mostrar todas
    }
  }

  calculateStars(score: number | null): string[] {
    const stars: string[] = [];
    if (score === null || score === 0) {
      return stars;
    }

    for (let i = 0; i < Math.floor(score); i++) {
      stars.push('images/star.png');
    }

    if (score % 1 !== 0) {
      stars.push('images/star-half.png');
    }

    return stars;
  }

  getReviewLink(review: any): string[] {
    if (review.id_song) {
      return ['/song', review.id_song];
    } else if (review.id_album) {
      return ['/album', review.id_album];
    } else if (review.id_list) {
      return ['/list', review.id_list];
    } else {
      return [];
    }
  }
}