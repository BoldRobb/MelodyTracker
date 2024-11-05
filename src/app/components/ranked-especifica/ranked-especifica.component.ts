import { Component } from '@angular/core';
import { EncabezadoComponent } from "../encabezado/encabezado.component";
import { BtnViewMoreComponent } from "../btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-ranked-especifica',
  standalone: true,
  imports: [EncabezadoComponent, BtnViewMoreComponent],
  templateUrl: './ranked-especifica.component.html',
  styleUrl: './ranked-especifica.component.css'
})
export class RankedEspecificaComponent {

}
