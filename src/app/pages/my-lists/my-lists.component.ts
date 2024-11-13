import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { ListsOfUserComponent } from "../../components/lists-of-user/lists-of-user.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [EncabezadoComponent, ListsOfUserComponent, BtnViewMoreComponent],
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.css'
})
export class MyListsComponent {

}
