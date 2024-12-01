import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service';
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';

@Component({
  selector: 'app-song-liked-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent],
  templateUrl: './song-liked-by.component.html',
  styleUrl: './song-liked-by.component.css'
})
export class SongLikedByComponent implements OnInit {
  totalLiked: number = 0; // Total de usuarios que han dado "like" a la canción
  userIds: number[] = []; // Lista de IDs de los usuarios que han dado "like"
  loading: boolean = true; // Bandera de carga

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private songService: SongService // Servicio para llamar al endpoint
  ) {}

  ngOnInit(): void {
    const id_song = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id_song) {
      this.fetchUsersWhoLikedSong(id_song); // Llamada al servicio para obtener los usuarios que dieron "like"
    }
  }

  // Reemplazamos la función anterior con esta nueva para obtener los usuarios que dieron "like"
  fetchUsersWhoLikedSong(idSong: number): void {
    this.songService.getUsersLiked(idSong).subscribe({
      next: (ids) => {
        this.userIds = ids; // Asignamos los IDs de los usuarios a la lista
        this.totalLiked = this.userIds.length; // Calculamos el total de "likes"
        console.log('User IDs who liked the song:', this.userIds); // Verifica que los IDs se obtienen correctamente
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users who liked song:', err);
        this.loading = false;
      }
    });
  }
}
