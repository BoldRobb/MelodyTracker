import { Component } from '@angular/core';
import { FollowsComponent } from "../../components/follows/follows.component";
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { BestUserComponent } from "../../components/best-user/best-user.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-best-users',
  standalone: true,
  imports: [FollowsComponent, EncabezadoComponent, BestUserComponent, BtnViewMoreComponent],
  templateUrl: './best-users.component.html',
  styleUrl: './best-users.component.css'
})
export class BestUsersComponent {

}
