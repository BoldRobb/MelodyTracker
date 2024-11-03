import { Component } from '@angular/core';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { GridrowComponent } from "../../components/gridrow/gridrow.component";

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [EncabezadoComponent, BtnViewMoreComponent, WelcomeComponent, GridrowComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {

}
