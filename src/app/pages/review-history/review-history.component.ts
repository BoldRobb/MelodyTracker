import { Component } from '@angular/core';
import { ReviewEspecificaComponent } from "../../components/review-especifica/review-especifica.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";

@Component({
  selector: 'app-review-history',
  standalone: true,
  imports: [ReviewEspecificaComponent, BtnViewMoreComponent, EncabezadoComponent],
  templateUrl: './review-history.component.html',
  styleUrl: './review-history.component.css'
})
export class ReviewHistoryComponent {

}
