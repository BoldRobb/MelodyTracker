import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UsersService } from '../../services/users/backend/users.service';
import { RouterModule } from '@angular/router';
import { ListenedOptionsComponent } from "../modals/listened-options/listened-options.component";

@Component({
  selector: 'app-follows',
  standalone: true,
  imports: [RouterModule, ListenedOptionsComponent],
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  @Input() userIds: number[] = []; // Asegúrate de que es un arreglo de números (IDs)
  usersDetails: any[] = []; // Aquí se guardarán los detalles de los usuarios
  loading: boolean = false; // Bandera para manejar el estado de carga

  constructor(private followsService: UsersService) {}

  ngOnInit(): void {
    console.log('Received userIds:', this.userIds); // Verifica que los IDs se reciben correctamente
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

        }
      });
  }

  openModalListenedOptions(id_user: number): void {
    this.followsService.openModalListenedOptions();
    this.followsService.setCurrentUserId(id_user); // Configura el ID de usuario dinámicamente
  }
}
