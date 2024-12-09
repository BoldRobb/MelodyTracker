import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute
import { UsersService } from '../../../services/users/backend/users.service'; // Importa el servicio
import { ArtistsService } from '../../../services/artists/backend/artists.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-results.component.html',
  styleUrls: ['./artist-results.component.css'],
})
export class ArtistResultsComponent implements OnInit, OnDestroy {
  private searchQuerySubscription!: Subscription;
  artists: any[] = [];  // Arreglo para almacenar los artistas encontrados
  query: string = '';  // Variable para almacenar el query

  constructor(
    private route: ActivatedRoute,  // Inyectamos ActivatedRoute
    private usersService: UsersService,  // Inyectamos Users
    private artistsService: ArtistsService // Inyectamos ArtistsService
  ) {}

  ngOnInit(): void {
    // Obtener el 'query' desde los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      const queryParam = params.get('query'); // Obtiene el valor del parámetro 'query'
      if (queryParam) {
        this.query = queryParam.replace(/\+/g, ' ');  // Reemplaza '+' por espacios
        this.searchArtists(this.query);  // Llamar a la función para buscar artistas
      }
    });

    // También podrías suscribirte al servicio `UsersService` si necesitas escuchar cambios en la búsqueda
    this.searchQuerySubscription = this.usersService.searchQuery$.subscribe(
      (query) => {
        this.query = query.replace(/\+/g, ' ');  // Reemplaza '+' con espacios
        this.searchArtists(this.query);  // Realiza la búsqueda de artistas
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  // Función para llamar al servicio y actualizar la lista de artistas
  searchArtists(query: string): void {
    this.artistsService.searchArtists(query).subscribe(
      (data) => {
        this.artists = data;  // Actualiza los resultados de artistas
      },
      (error) => {
        console.error('Error al buscar artistas:', error);
        this.artists = [];  // Si hay un error, asegurarse de que no haya datos
      }
    );
  }
}
