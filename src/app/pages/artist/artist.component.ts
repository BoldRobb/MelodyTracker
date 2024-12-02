import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa ActivatedRoute
import { ArtistsService } from '../../services/artists/backend/artists.service'; // Asegúrate de que esta sea la ruta correcta al servicio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id_artist: number = 0; // Inicializa el ID del artista
  artist: { id_artist: number; name: string; bio: string; photo: string } | null = null;
  songs: { id_song: number; photo: string }[] = [];
  albums: { id_album: number; photo: string }[] = [];

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtén el ID del artista desde la URL
    this.route.params.subscribe(params => {
      this.id_artist = +params['id']; // El '+' convierte el valor en un número
      this.getArtistDetails();
      this.getArtistSongs();
      this.getArtistAlbums();
    });
  }

  getArtistDetails() {
    this.artistsService.getArtist(this.id_artist).subscribe({
      next: (data) => {
        this.artist = data;
      },
      error: (err) => {
        console.error('Error fetching artist details', err);
      }
    });
  }

  getArtistSongs() {
    this.artistsService.getArtistSongs(this.id_artist).subscribe({
      next: (data) => {
        this.songs = data;
      },
      error: (err) => {
        console.error('Error fetching artist songs', err);
      }
    });
  }

  getArtistAlbums() {
    this.artistsService.getArtistAlbums(this.id_artist).subscribe({
      next: (data) => {
        this.albums = data;
      },
      error: (err) => {
        console.error('Error fetching artist albums', err);
      }
    });
  }
}
