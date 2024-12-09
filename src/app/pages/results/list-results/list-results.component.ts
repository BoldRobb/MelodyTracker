import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener los parámetros de la URL
import { Subscription } from 'rxjs';
import { ListsService } from '../../../services/lists/backend/lists.service'; // Importamos el servicio
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../../services/album/backend/album-service.service'; // Importamos el servicio
import { UsersService } from '../../../services/users/backend/users.service'; // Importa el servicio

@Component({
  selector: 'app-list-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.css']
})
export class ListResultsComponent implements OnInit, OnDestroy {
  private searchQuerySubscription!: Subscription; // Para manejar las suscripciones
  lists: any[] = []; // Almacena los resultados de las listas
  query: string = ''; // Consulta de búsqueda

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro `query` de la URL
    private listsService: ListsService, // Servicio para realizar la búsqueda de listas
    private usersService: UsersService,  // Inyectamos Users
  ) {}

  ngOnInit(): void {
    // Suscripción a los parámetros de la URL para obtener el valor de 'query'
    this.route.paramMap.subscribe(params => {
      const queryParam = params.get('query'); // Extrae el parámetro 'query'
      if (queryParam) {
        this.query = queryParam.replace(/\+/g, ' '); // Reemplaza '+' por espacios
        this.searchLists(this.query); // Llama a la función para buscar listas
      }
    });

    // También podrías suscribirte al servicio `UsersService` si necesitas escuchar cambios en la búsqueda
    this.searchQuerySubscription = this.usersService.searchQuery$.subscribe(
      (query) => {
        this.query = query.replace(/\+/g, ' ');  // Reemplaza '+' con espacios
        this.searchLists(this.query);  // Realiza la búsqueda de artistas
      }
    );

  }

  ngOnDestroy(): void {
    // Limpia la suscripción si existe para evitar fugas de memoria
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  // Método para buscar listas utilizando el servicio
  searchLists(query: string): void {
    this.listsService.searchLists(query).subscribe(
      (data) => {
        this.lists = data; // Actualiza la lista de resultados
      },
      (error) => {
        console.error('Error al buscar listas:', error);
        this.lists = []; // Limpia los resultados en caso de error
      }
    );
  }
}
