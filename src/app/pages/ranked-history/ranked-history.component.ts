import { Component } from '@angular/core';
import { RankedEspecificaComponent } from "../../components/ranked-especifica/ranked-especifica.component";
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-ranked-history',
  standalone: true,
  imports: [RankedEspecificaComponent, EncabezadoComponent, BtnViewMoreComponent],
  templateUrl: './ranked-history.component.html',
  styleUrl: './ranked-history.component.css'
})
export class RankedHistoryComponent {

}
