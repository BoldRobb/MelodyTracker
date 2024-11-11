import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album-service.service';  // Importa el servicio
import { SpinnerService } from '../../services/spinner.service';  // Si usas el servicio Spinner
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component'; // Importa el componente standalone

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  standalone: true,  // Hacemos que el componente sea standalone
  imports: [DatosSongAlbumComponent]  // Importamos el componente standalone
})
export class AlbumComponent{
  
}