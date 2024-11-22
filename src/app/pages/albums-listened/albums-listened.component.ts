import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { GridrowComponent } from "../../components/gridrow/gridrow.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-albums-listened',
  standalone: true,
  imports: [EncabezadoComponent, GridrowComponent, BtnViewMoreComponent],
  templateUrl: './albums-listened.component.html',
  styleUrl: './albums-listened.component.css'
})
export class AlbumsListenedComponent {

}
