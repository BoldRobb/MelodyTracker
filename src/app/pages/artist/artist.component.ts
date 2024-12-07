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
  id_artist: number = 0;
  artist: { id_artist: number; name: string; bio: string; photo: string } | null = null;
  
  // Añadido 'name' en la interfaz de las canciones y los álbumes
  songs: { id_song: number; name: string; photo: string }[] = [];
  albums: { id_album: number; name: string; photo: string }[] = [];

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_artist = +params['id']; 
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
        this.songs = data; // Asegúrate de que los datos incluyen 'name'
      },
      error: (err) => {
        console.error('Error fetching artist songs', err);
      }
    });
  }

  getArtistAlbums() {
    this.artistsService.getArtistAlbums(this.id_artist).subscribe({
      next: (data) => {
        this.albums = data; // Asegúrate de que los datos incluyen 'name'
      },
      error: (err) => {
        console.error('Error fetching artist albums', err);
      }
    });
  }
}