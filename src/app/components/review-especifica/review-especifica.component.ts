import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/others/spinner.service';
import { UsersService } from '../../services/users/backend/users.service';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-review-especifica',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './review-especifica.component.html',
  styleUrls: ['./review-especifica.component.css']
})
export class ReviewEspecificaComponent implements OnInit {
  idUser!: number;
  combinedReviews: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.idUser = +this.activatedRoute.snapshot.paramMap.get('id')!;

    // Realiza las llamadas para obtener las reseñas
    forkJoin([
      this.usersService.getReviewsHistory(this.idUser),
      this.usersService.getReviewsHistoryAlbums(this.idUser),
      this.usersService.getReviewsHistoryLists(this.idUser) // Nueva llamada para obtener las listas
    ]).pipe(
      finalize(() => this.spinnerService.hide())
    ).subscribe(
      ([songs, albums, lists]) => {
        // Combina las reseñas de canciones, álbumes y listas
        this.combinedReviews = [
          ...songs.reviews_history,
          ...albums.reviews_history_albums,
          ...lists.reviews_history_lists
        ];

        // Ordena las reseñas por fecha
        this.combinedReviews.sort((a, b) => new Date(b.date_review).getTime() - new Date(a.date_review).getTime());
      },
      error => {
        console.error('Error al obtener reseñas:', error);
      }
    );
  }

  /**
   * Calcula las imágenes de estrellas basado en el score
   * @param score Puntuación (puede ser null)
   * @returns Lista de rutas de imágenes de estrellas
   */
  calculateStars(score: number | null): string[] {
    const stars: string[] = [];
    if (score === null || score === 0) {
      // Si no hay puntuación, no se muestran estrellas
      return stars;
    }

    for (let i = 0; i < Math.floor(score); i++) {
      // Agrega estrellas llenas según la puntuación entera
      stars.push('images/star.png');
    }

    if (score % 1 !== 0) {
      // Si hay un decimal, agrega media estrella
      stars.push('images/star-half.png');
    }

    return stars;
  }
}
