import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { FollowsComponent } from "../../components/follows/follows.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [EncabezadoComponent, FollowsComponent, BtnViewMoreComponent],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css'
})
export class FollowersComponent {

}
