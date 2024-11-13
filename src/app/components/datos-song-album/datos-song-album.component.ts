import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service';
import { SpinnerService } from '../../services/others/spinner.service';

@Component({
  selector: 'app-datos-song-album',
  templateUrl: './datos-song-album.component.html',
  styleUrls: ['./datos-song-album.component.css'],
  standalone: true,
  imports: [] // Aquí podrías agregar otros módulos si es necesario, por ejemplo, `CommonModule`
})
export class DatosSongAlbumComponent implements OnInit {
  albumId: number | null = null;

  // Variables para almacenar los detalles del álbum
  albumCover: string = '';
  title: string = '';
  releaseYear: number = 0;
  artist: string = '';
  language: string = '';
  releaseDate: string = '';
  listens: number = 0;
  comments: number = 0;
  listsCreated: number = 0;
  likes: number = 0;
  ratingCount: number = 0;

  isAlbumRoute: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private songService: SongService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    // Detectar si estamos en la ruta de álbum o de canción
    this.isAlbumRoute = this.router.url.startsWith('/album');

    // Muestra el spinner al comenzar a cargar datos
    this.spinnerService.show();

    // Obtener el ID desde la URL y cargar detalles
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam && !isNaN(Number(idParam))) {
        this.albumId = Number(idParam);
        this.getDetails(this.albumId); // Obtener los detalles
      } else {
        this.router.navigate(['/404']); // Redirigir a 404 si el ID no es válido
        this.spinnerService.hide();
      }
    });
  }

  // Método para obtener los detalles (álbum o canción según la ruta)
  getDetails(id: number): void {
    if (this.isAlbumRoute) {
      // Si estamos en la ruta de álbum, obtenemos detalles del álbum
      this.albumService.getAlbumDetails(id).subscribe(
        (response) => {
          this.assignAlbumData(response);
          this.spinnerService.hide(); // Oculta el spinner al completar la carga
        },
        (error) => {
          console.error('Error al obtener los detalles del álbum:', error);
          this.router.navigate(['/404']);
          this.spinnerService.hide();
        }
      );
    } else {
      // Si estamos en la ruta de canción, obtenemos detalles de la canción
      this.songService.getSongDetails(id).subscribe(
        (response) => {
          console.log('Detalles de la canción:', response); // Verifica los datos en la consola
          this.assignSongData(response);
          this.spinnerService.hide();
        },
        (error) => {
          console.error('Error al obtener los detalles de la canción:', error);
          this.router.navigate(['/404']);
          this.spinnerService.hide();
        }
      );
    }
  }

  // Asigna los datos de álbum
  assignAlbumData(response: any): void {
    this.albumCover = response.photo;
    this.title = response.name;
    this.releaseYear = new Date(response.released).getFullYear();
    this.artist = response.artist_name;
    this.language = response.language;
    this.releaseDate = response.released;
    this.listens = response.listens;
    this.comments = response.comments;
    this.listsCreated = response.listsCreated;
    this.likes = response.likes;
    this.ratingCount = response.ratingCount;
  }

  assignSongData(response: any): void {
    this.albumCover = response.photo;
    this.title = response.name;
    this.artist = response.artist_name;
    this.language = response.language;
    this.releaseDate = response.released; 
    this.releaseYear = new Date(response.released).getFullYear(); // Asegúrate de que este valor es correcto
    this.listens = response.listens;
    this.comments = response.comments;
    this.likes = response.likes;
    this.ratingCount = response.ratingCount;
  }
  
}
