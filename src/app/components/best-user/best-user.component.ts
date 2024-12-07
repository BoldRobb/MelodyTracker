import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users/backend/users.service';

@Component({
  selector: 'app-best-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './best-user.component.html',
  styleUrls: ['./best-user.component.css']
})
export class BestUserComponent {
  @Input() id_user: number = 0;    // Recibe el id del usuario
  @Input() username: string = '';  // Recibe el nombre de usuario
  @Input() photo: string = '';     // Recibe la foto del usuario
  @Input() songs: number = 0;      // Recibe el número de canciones
  @Input() rankeds: number = 0;    // Recibe el número de rankeds
  @Input() reviews: number = 0;    // Recibe el número de comentarios

  constructor(private userService: UsersService) {}

  // Llama al servicio para abrir el modal
  openModalListenedOptions(id_user: number) {
    this.userService.openModalListenedOptions(); 
    this.userService.setCurrentUserId(id_user); // Agregar esto para manejar dinámicamente el id_user
  }
}
