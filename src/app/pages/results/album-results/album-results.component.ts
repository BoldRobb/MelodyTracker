import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../../services/album/backend/album-service.service'; // Importamos el servicio
import { UsersService } from '../../../services/users/backend/users.service'; // Importa el servicio

@Component({
  selector: 'app-album-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-results.component.html',
  styleUrls: ['./album-results.component.css'],
})
export class AlbumResultsComponent implements OnInit, OnDestroy {
  private searchQuerySubscription!: Subscription;
  albums: any[] = [];  // Arreglo para almacenar los álbumes encontrados
  query: string = '';  // Variable para almacenar el query

  constructor(
    private route: ActivatedRoute,  // Inyectamos ActivatedRoute
    private albumService: AlbumService, // Inyectamos AlbumService
    private usersService: UsersService,  // Inyectamos Users
  ) {}

  ngOnInit(): void {
    // Obtener el 'query' desde los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      const queryParam = params.get('query'); // Obtiene el valor del parámetro 'query'
      if (queryParam) {
        this.query = queryParam.replace(/\+/g, ' ');  // Reemplaza '+' por espacios
        this.searchAlbums(this.query);  // Llamar a la función para buscar álbumes
      }
    });

    // También podrías suscribirte al servicio `UsersService` si necesitas escuchar cambios en la búsqueda
    this.searchQuerySubscription = this.usersService.searchQuery$.subscribe(
      (query) => {
        this.query = query.replace(/\+/g, ' ');  // Reemplaza '+' con espacios
        this.searchAlbums(this.query);  // Realiza la búsqueda de artistas
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  // Función para llamar al servicio y actualizar la lista de álbumes
  searchAlbums(query: string): void {
    this.albumService.searchAlbums(query).subscribe(
      (data) => {
        this.albums = data;  // Actualiza los resultados de álbumes
      },
      (error) => {
        console.error('Error al buscar álbumes:', error);
        this.albums = [];  // Si hay un error, asegurarse de que no haya datos
      }
    );
  }
}
