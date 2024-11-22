import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UsersService } from '../../services/users/backend/users.service';

@Component({
  selector: 'app-follows',
  standalone: true,
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  @Input() userIds: number[] = []; // Recibe la lista de IDs como input
  usersDetails: any[] = []; // Aquí se guardarán los detalles de los usuarios
  loading: boolean = false; // Bandera para manejar el estado de carga

  constructor(private followsService: UsersService) {}

  ngOnInit(): void {
    if (this.userIds.length > 0) {
      this.fetchUserDetails();
    }
  }

  fetchUserDetails(): void {
    this.loading = true; // Activar el spinner si es necesario
    this.followsService.getUsersDetails(this.userIds)
      .pipe(finalize(() => (this.loading = false))) // Desactivar el spinner al terminar
      .subscribe({
        next: (details) => {
          this.usersDetails = details; // Almacena los detalles de los usuarios
        },
        error: (err) => {
          console.error('Error al cargar detalles de usuarios:', err);
        }
      });
  }
}
