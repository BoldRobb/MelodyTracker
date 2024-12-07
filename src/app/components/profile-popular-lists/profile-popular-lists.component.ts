import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { UsersService } from '../../services/users/backend/users.service'; // Importa el servicio
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-popular-lists',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './profile-popular-lists.component.html',
  styleUrls: ['./profile-popular-lists.component.css']
})
export class ProfilePopularListsComponent implements OnInit {
  topLists: any[] = []; // Para almacenar las listas más populares
  userId!: number; // ID del usuario

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el id del usuario desde la URL
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Usamos el '+' para convertir a número
      this.loadTopLists(); // Llamar al método para cargar las listas
    });
  }

  loadTopLists(): void {
    this.userService.getTop4ListsOfUser(this.userId).subscribe(
      (response) => {
        this.topLists = response.top_lists; // Almacenar las listas obtenidas
        console.log(this.topLists); // Verifica las listas y las imágenes
      },
      (error) => {
        console.error('Error al obtener las listas más populares', error);
      }
    );
  }
}
