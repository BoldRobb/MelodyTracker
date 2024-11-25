import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service'; // Asegúrate de importar el servicio correcto
import { SpinnerService } from '../../services/others/spinner.service'; // Asegúrate de importar el servicio correcto
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-your-rating',
  templateUrl: './your-rating.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./your-rating.component.css'],
})
export class YourRatingComponent implements OnInit {
  stars = Array(5).fill(0); // Arreglo para las 5 estrellas
  hoverIndex = 0; // Índice actual de hover
  selectedRating = 0; // Puntuación seleccionada
  id_album!: number; // ID del álbum
  id_user!: number; // ID del usuario

  constructor(
    private route: ActivatedRoute,
    private rankService: AlbumService,  // Asegúrate de importar tu servicio de ranking
    private spinnerService: SpinnerService // Asegúrate de importar tu servicio de spinner
  ) {}

  ngOnInit(): void {
    // Obtener id_album desde la URL
    this.route.params.subscribe((params) => {
      this.id_album = +params['id']; // El '+' convierte el parámetro a número
      this.id_user = this.getUserIdFromLocalStorage();
      
      // Verificar si el usuario ya ha calificado este álbum
      this.rankService.hasRankAlbum(this.id_user, this.id_album).subscribe(
        (response) => {
          if (response.has_rank) {
            this.selectedRating = response.score || 0;
            this.fillStars(response.score || 0); // Pinta las estrellas con el puntaje
          }
        },
        (error) => {
          console.error('Error al verificar si el álbum fue calificado', error);
        }
      );
    });
  }

  // Método para obtener el id_user del localStorage (ajústalo según tu implementación)
  private getUserIdFromLocalStorage(): number {
    const accessToken = localStorage.getItem('access_token');
    const userData = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : null;
    return userData ? userData.id_user : 0; // Cambia según la estructura de tu token
  }

  handleMouseMove(event: MouseEvent): void {
    const target = (event.target as HTMLElement).closest('.estrella');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const index = parseInt(target.getAttribute('data-index') || '0', 10);

    const mouseX = event.clientX - rect.left;
    const isHalf = mouseX < rect.width / 2;

    this.hoverIndex = index + (isHalf ? 0.5 : 1);
  }

  clearHover(): void {
    this.hoverIndex = 0;
  }

  setRating(index: number, event: MouseEvent): void {
    const target = (event.target as HTMLElement).closest('.estrella');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const isHalf = mouseX < rect.width / 2;

    const newRating = index + (isHalf ? 0.5 : 1);

    this.rankAlbum(newRating);  // Asigna directamente el rating sin eliminar el anterior
  }

  resetRating(): void {
    this.deleteRankedAlbum().subscribe(() => {
      console.log('Calificación eliminada con éxito');
    }, (error) => {
      console.error('Error al eliminar la calificación:', error);
    });
  }
  
  // Llamada al servicio para eliminar el rating
  private deleteRankedAlbum() {
    return this.rankService.deleteRankedAlbum(this.id_user, this.id_album).pipe(
      finalize(() => {
        this.selectedRating = 0;  // Esto eliminará la calificación visualmente
        this.fillStars(0);  // Limpia las estrellas
      })
    );
  }
  
  // Llamada al servicio para asignar el nuevo rating
  private rankAlbum(score: number) {
    this.rankService.rankAlbum(this.id_user, this.id_album, score).subscribe(
      (response) => {
        this.selectedRating = score; // Actualizar la calificación seleccionada
        console.log('Calificación realizada con éxito');
        this.fillStars(score); // Pinta las estrellas con la calificación
      },
      (error) => {
        console.error('Error al enviar la calificación:', error);
      }
    );
  }

  // Función para pintar las estrellas en la interfaz
  private fillStars(score: number): void {
    this.stars = Array(5).fill(0).map((_, index) => {
      if (score >= index + 1) {
        return 1; // Estrella llena
      } else if (score > index) {
        return 0.5; // Estrella media
      } else {
        return 0; // Estrella vacía
      }
    });
  }
}
