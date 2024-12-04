import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';  // Asegúrate de que el servicio está bien importado
import { SpinnerService } from '../../services/others/spinner.service';  // Servicio de spinner para mostrar/ocultar el cargador
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-songs-on-album',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './songs-on-album.component.html',
  styleUrls: ['./songs-on-album.component.css']
})
export class SongsOnAlbumComponent implements OnInit {
  id!: number;  // Variable para almacenar el id_album
  songs: any[] = []; // Variable para almacenar las canciones del álbum
  isAlbumRoute: boolean = false;
  isListRoute: boolean = false;

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private albumService: AlbumService,  // Servicio para obtener las canciones del álbum
    private spinnerService: SpinnerService,  // Para controlar el spinner
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Obtener el id_album de la URL

    this.isAlbumRoute = this.router.url.startsWith('/album');

    
    this.isListRoute = this.router.url.startsWith('/list');


    this.id = +this.route.snapshot.paramMap.get('id')!;  // Asegúrate de que el 'id' esté en la URL
    // Llamar al servicio para obtener las canciones del álbum
    if (this.isAlbumRoute) {
      this.loadAlbumSongs();
    } else if (this.isListRoute) {
      this.loadAlbumSongs();
    }
    
  }

  loadAlbumSongs(): void {
    // Mostrar el spinner mientras se hace la solicitud
    this.spinnerService.show();
  
    // Obtener las canciones del álbum
    this.albumService.getSongsOnAlbum(this.id).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.songs = response;  // Asignar el arreglo directamente a `songs`
        } else {
          console.error('La respuesta no es un arreglo de canciones');
        }
      },
      error: (err) => {
        console.error('Error al cargar las canciones:', err);
      },
      complete: () => {
        this.spinnerService.hide();  // Ocultar el spinner cuando termine la solicitud
      }
    });
  }
  
}
