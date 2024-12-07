import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/others/spinner.service';
import { UsersService } from '../../services/users/backend/users.service';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { BtnViewMoreComponent } from "../btn-view-more/btn-view-more.component";
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-ranked-especifica',
  standalone: true,
  imports: [EncabezadoComponent, BtnViewMoreComponent, CommonModule],  // Agrega CommonModule
  templateUrl: './ranked-especifica.component.html',
  styleUrls: ['./ranked-especifica.component.css']
})
export class RankedEspecificaComponent implements OnInit {
  idUser!: number;
  rankedData: any[] = [];  // Almacena las canciones, álbumes y listas rankeadas

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.idUser = +this.activatedRoute.snapshot.paramMap.get('id')!;
  
    forkJoin([
      this.usersService.getRankedSongs(this.idUser).pipe(catchError(() => of({ ranked_songs: [] }))),
      this.usersService.getRankedAlbums(this.idUser).pipe(catchError(() => of({ ranked_albums: [] }))),
      this.usersService.getRankedLists(this.idUser).pipe(catchError(() => of({ ranked_lists: [] }))),
    ])
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe(
        ([songs, albums, lists]) => {
          this.rankedData = [
            ...(songs?.ranked_songs || []).map((song: any) => ({ ...song, type: 'song' })),
            ...(albums?.ranked_albums || []).map((album: any) => ({ ...album, type: 'album' })),
            ...(lists?.ranked_lists || []).map((list: any) => ({ ...list, type: 'list' })),
          ];
          this.rankedData.sort((a, b) => new Date(b.date_score).getTime() - new Date(a.date_score).getTime());
        },
        error => console.error('Error al obtener datos rankeados:', error)
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
