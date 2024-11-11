import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album-service.service';  // Importamos el servicio

@Component({
  selector: 'app-datos-song-album',
  templateUrl: './datos-song-album.component.html',
  styleUrls: ['./datos-song-album.component.css'],
  standalone: true,  // Hacemos que el componente sea standalone
  imports: []  // Aquí podrías agregar otros módulos si es necesario, por ejemplo, `CommonModule`
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del álbum desde la URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam && !isNaN(Number(idParam))) {
        this.albumId = Number(idParam);
        this.getAlbumDetails(this.albumId);  // Obtener los detalles del álbum
      } else {
        this.router.navigate(['/404']);  // Si el ID no es válido, redirigimos a 404
      }
    });
  }

  // Método para obtener los detalles del álbum
  getAlbumDetails(albumId: number): void {
    this.albumService.getAlbumDetails(albumId).subscribe(
      (response) => {
        // Asignar los datos recibidos a las variables
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
      },
      (error) => {
        console.error('Error al obtener los detalles del álbum:', error);
        this.router.navigate(['/404']);
      }
    );
  }
}
