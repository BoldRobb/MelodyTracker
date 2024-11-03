import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { GridrowComponent } from "../../components/gridrow/gridrow.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-songs-listened',
  standalone: true,
  imports: [EncabezadoComponent, GridrowComponent, BtnViewMoreComponent],
  templateUrl: './songs-listened.component.html',
  styleUrl: './songs-listened.component.css'
})
export class SongsListenedComponent {

}
