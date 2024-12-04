import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service'; // Importar el servicio para canciones
import { ListsService } from '../../services/lists/backend/lists.service'; // Importar el servicio para listas
import { SpinnerService } from '../../services/others/spinner.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-your-rating',
  templateUrl: './your-rating.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./your-rating.component.css'],
})
export class YourRatingComponent implements OnInit {
  stars = Array(5).fill(0);
  hoverIndex = 0;
  selectedRating = 0;
  id_entity!: number; // ID del álbum o canción
  id_user!: number; 
  entityType!: 'album' | 'song' | 'list'; 


  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private songService: SongService, // Cambiar UsersService por tu servicio correcto
    private spinnerService: SpinnerService,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id_entity = +params['id'];
      this.id_user = this.getUserIdFromLocalStorage();
  
      // Determina el tipo de entidad desde la URL
      const entityPath = this.route.snapshot.url[0]?.path;
      if (entityPath === 'album') {
        this.entityType = 'album';
      } else if (entityPath === 'song') {
        this.entityType = 'song';
      } else if (entityPath === 'list') {
        this.entityType = 'list';
      }
  
      this.checkIfRanked(); // Verificar si ya está calificado
    });
  }
  

  private getUserIdFromLocalStorage(): number {
    const accessToken = localStorage.getItem('access_token');
    const userData = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : null;
    return userData ? userData.id_user : 0;
  }

  setRank(){
    this.albumService.hasRankAlbum(this.id_user, this.id_entity)
        .subscribe(
          (response) => {
            if (response.has_rank) {
              this.selectedRating = response.score || 0;
              this.fillStars(this.selectedRating);
            }
          },
          (error) => {
            console.error(`Error verificando si el álbum fue calificado`, error);
          }
        );
      }
      
  private checkIfRanked(): void {
    if (this.entityType === 'album') {
      this.setRank();
    } else if(this.entityType === 'list'){
      this.listsService.hasRankList(this.id_user, this.id_entity)
      .subscribe(
        (response) => {
          if (response.has_rank) {
            this.selectedRating = response.score || 0;
            this.fillStars(this.selectedRating);
          }
        },
        (error) => {
          console.error(`Error verificando si la lista fue calificada`, error);
        }
      );

    } else {
      this.songService.hasRankSong(this.id_user, this.id_entity)
        .subscribe(
          (response) => {
            if (response.has_rank) {
              this.selectedRating = response.score || 0;
              this.fillStars(this.selectedRating);
            }
          },
          (error) => {
            console.error(`Error verificando si la canción fue calificada`, error);
          }
        );
    }
  }

  private rankList(score: number): void {
    this.listsService.rankList(this.id_user, this.id_entity, score)
      .subscribe(
        () => {
          this.selectedRating = score;
          console.log(`Calificación para la lista realizada con éxito`);
          this.fillStars(score);
        },
        (error) => {
          console.error(`Error calificando la lista`, error);
        }
      );
  }

  setRating(index: number, event: MouseEvent): void {
    const target = (event.target as HTMLElement).closest('.estrella');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const isHalf = mouseX < rect.width / 2;

    const newRating = index + (isHalf ? 0.5 : 1);

    this.rankEntity(newRating);
    this.checkIfRanked();
  }

  private rankEntity(score: number): void {
    if (this.entityType === 'album') {
      this.albumService.rankAlbum(this.id_user, this.id_entity, score)
        .subscribe(
          () => {
            this.selectedRating = score;
            this.albumService.updateComments();
            console.log(`Calificación para el álbum realizada con éxito`);
            this.fillStars(score);
          },
          (error) => {
            console.error(`Error calificando el álbum`, error);
          }
        );
    } else if (this.entityType === 'song') {
      this.songService.rankSong(this.id_user, this.id_entity, score)
        .subscribe(
          () => {
            this.selectedRating = score;
            this.albumService.updateComments();
            console.log(`Calificación para la canción realizada con éxito`);
            this.fillStars(score);
          },
          (error) => {
            console.error(`Error calificando la canción`, error);
          }
        );
    } else if (this.entityType === 'list') {
      this.rankList(score);
    }
  }
  

  clearHover(): void {
    this.hoverIndex = 0; // Reinicia el índice de hover al salir del área
  }

  handleMouseMove(event: MouseEvent): void {
    const target = (event.target as HTMLElement).closest('.estrella');
    if (!target) {
      this.hoverIndex = 0; // Si no estás sobre ninguna estrella, reinicia el índice de hover
      return;
    }
  
    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const index = Number(target.getAttribute('data-index'));
  
    // Determina si el mouse está sobre la mitad izquierda o derecha de la estrella
    const isHalf = mouseX < rect.width / 2;
    this.hoverIndex = index + (isHalf ? 0.5 : 1);
    
  }

  resetRating(): void {
    const service = 
      this.entityType === 'album' ? this.albumService.deleteRankedAlbum :
      this.entityType === 'song' ? this.songService.deleteRankedSong :
      this.listsService.deleteRankedList; // Manejar listas
  
    service.call(
      this.entityType === 'album' ? this.albumService :
      this.entityType === 'song' ? this.songService :
      this.listsService,
      this.id_user,
      this.id_entity
    )
    .pipe(finalize(() => {
      this.selectedRating = 0;
      this.fillStars(0);
    }))
    .subscribe(
      () => console.log(`Calificación eliminada para ${this.entityType}`),
      (error) => console.error(`Error al eliminar la calificación de ${this.entityType}`, error)
    );
  }
  

  private fillStars(score: number): void {
    this.stars = Array(5).fill(0).map((_, index) => {
      if (score >= index + 1) {
        return 1;
      } else if (score > index) {
        return 0.5;
      } else {
        return 0;
      }
    });
  }
}
