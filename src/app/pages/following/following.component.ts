import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { FollowsComponent } from "../../components/follows/follows.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [EncabezadoComponent, FollowsComponent, BtnViewMoreComponent],
  templateUrl: './following.component.html',
  styleUrl: './following.component.css'
})
export class FollowingComponent {
  
}
