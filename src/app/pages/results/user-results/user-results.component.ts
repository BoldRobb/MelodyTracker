import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para acceder a los parámetros de la URL
import { UsersService } from '../../../services/users/backend/users.service';  // Importa el servicio UsersService
import { Subscription } from 'rxjs';  // Importamos Subscription para manejar las suscripciones
import { CommonModule } from '@angular/common';  // Si usas alguna directiva de CommonModule

@Component({
  selector: 'app-user-results',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de importar CommonModule si utilizas directivas comunes
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.css'],
})
export class UserResultsComponent implements OnInit, OnDestroy {
  private searchQuerySubscription!: Subscription;  // Para gestionar la suscripción a los parámetros
  users: any[] = [];  // Arreglo para almacenar los usuarios encontrados
  query: string = '';  // Variable para almacenar la consulta de búsqueda

  constructor(
    private route: ActivatedRoute,  // Para obtener parámetros de la URL
    private usersService: UsersService  // Inyectamos el servicio UsersService
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'query' desde la URL
    this.route.paramMap.subscribe(params => {
      const queryParam = params.get('query');  // Obtener el valor del parámetro 'query'
      if (queryParam) {
        this.query = queryParam.replace(/\+/g, ' ');  // Reemplaza '+' con espacios en el texto
        this.searchUsers(this.query);  // Llamamos a la función para realizar la búsqueda de usuarios
      }
    });

    // Suscripción a la búsqueda si se utiliza un comportamiento centralizado
    // Esto es útil si tienes un servicio compartido para la búsqueda de usuarios
    this.searchQuerySubscription = this.usersService.searchQuery$.subscribe(
      (query) => {
        this.query = query.replace(/\+/g, ' ');  // Reemplazar '+' con espacios
        this.searchUsers(this.query);  // Realizar la búsqueda de usuarios
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar posibles fugas de memoria
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  // Función para buscar usuarios usando el servicio `UsersService`
  searchUsers(query: string): void {
    this.usersService.searchUsers(query).subscribe(
      (data) => {
        this.users = data;  // Asignar los resultados de búsqueda a la variable users
      },
      (error) => {
        console.error('Error al buscar usuarios:', error);  // En caso de error
        this.users = [];  // Asegurarse de que la lista de usuarios esté vacía en caso de error
      }
    );
  }
}
