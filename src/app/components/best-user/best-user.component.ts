import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

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
}
