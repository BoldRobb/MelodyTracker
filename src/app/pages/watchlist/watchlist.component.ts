import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { GridrowComponent } from "../../components/gridrow/gridrow.component";

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [EncabezadoComponent, BtnViewMoreComponent, WelcomeComponent, GridrowComponent],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  type: string = '';  // Inicializa la propiedad `type` como una cadena vacía
  idUser: string = '';  // Variable para almacenar el id_user

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el parámetro de la URL para decidir si es 'song' o 'album' y también obtener el id_user
    this.route.url.subscribe(urlSegments => {
      if (urlSegments[0].path === 'watchlist_songs') {
        this.type = 'watchlistSongs';  // Si es 'watchlist_songs', asigna 'watchlistSongs'
      } else if (urlSegments[0].path === 'watchlist_albums') {
        this.type = 'watchlistAlbums';  // Si es 'watchlist_albums', asigna 'watchlistAlbums'
      }
    });

    // Obtener el parámetro 'id_user' de la ruta
    this.route.params.subscribe(params => {
      this.idUser = params['id_user'];  // Guarda el id_user de la URL
    });
  }
}
