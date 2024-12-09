import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute
import { SongService } from '../../../services/song/backend/song.service'; // Asegúrate de importar el servicio de canciones
import { UsersService } from '../../../services/users/backend/users.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Para usar ngIf y otras directivas
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-song-results',
  standalone: true,
  imports: [CommonModule, RouterModule], // Asegúrate de importar CommonModule si usas directivas como ngIf
  templateUrl: './song-results.component.html',
  styleUrls: ['./song-results.component.css'],
})
export class SongResultsComponent implements OnInit, OnDestroy {
  private searchQuerySubscription!: Subscription;
  songs: any[] = [];  // Arreglo para almacenar las canciones encontradas
  query: string = '';  // Variable para almacenar el query

  constructor(
    private route: ActivatedRoute,  // Inyectamos ActivatedRoute
    private songService: SongService, // Inyectamos SongsService
    private usersService: UsersService,  // Inyectamos Users
  ) {}

  ngOnInit(): void {
    // Obtener el 'query' desde los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      const queryParam = params.get('query'); // Obtiene el valor del parámetro 'query'
      if (queryParam) {
        this.query = queryParam.replace(/\+/g, ' ');  // Reemplaza '+' por espacios
        this.searchSongs(this.query);  // Llamar a la función para buscar canciones
      }
    });

    // También podrías suscribirte al servicio `UsersService` si necesitas escuchar cambios en la búsqueda
    this.searchQuerySubscription = this.usersService.searchQuery$.subscribe(
      (query) => {
        this.query = query.replace(/\+/g, ' ');  // Reemplaza '+' con espacios
        this.searchSongs(this.query);  // Realiza la búsqueda de artistas
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  // Función para llamar al servicio y actualizar la lista de canciones
  searchSongs(query: string): void {
    this.songService.searchSongs(query).subscribe(
      (data) => {
        this.songs = data;  // Actualiza los resultados de canciones
      },
      (error) => {
        console.error('Error al buscar canciones:', error);
        this.songs = [];  // Si hay un error, asegurarse de que no haya datos
      }
    );
  }
}
