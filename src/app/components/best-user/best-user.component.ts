import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-best-user',
  standalone: true,
  imports: [],
  templateUrl: './best-user.component.html',
  styleUrls: ['./best-user.component.css']
})
export class BestUserComponent {

  @Input() username: string = '';  // Recibe el nombre de usuario
  @Input() photo: string = '';     // Recibe la foto del usuario
  @Input() songs: number = 0;      // Recibe el número de canciones
  @Input() rankeds: number = 0;    // Recibe el número de rankeds
  @Input() reviews: number = 0;    // Recibe el número de comentarios

}
