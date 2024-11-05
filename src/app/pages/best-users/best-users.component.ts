import { Component } from '@angular/core';
import { FollowsComponent } from "../../components/follows/follows.component";
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";

@Component({
  selector: 'app-best-users',
  standalone: true,
  imports: [FollowsComponent, EncabezadoComponent],
  templateUrl: './best-users.component.html',
  styleUrl: './best-users.component.css'
})
export class BestUsersComponent {

}
