import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service';
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';

@Component({
  selector: 'app-song-heard-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent],
  templateUrl: './song-heard-by.component.html',
  styleUrls: ['./song-heard-by.component.css']
})
export class SongHeardByComponent implements OnInit {
  totalListened: number = 0; // Total de usuarios que han escuchado la canción
  userIds: number[] = []; // Lista de IDs a pasar al componente <app-follows>
  loading: boolean = true; // Bandera de carga

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private songService: SongService // Servicio para llamar al endpoint
  ) {}

  ngOnInit(): void {
    const id_song = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id_song) {
      this.fetchUsersWhoHeardSong(id_song);
    }
  }
  
  fetchUsersWhoHeardSong(idSong: number): void {
    this.songService.getUsersListened(idSong).subscribe({
      next: (ids) => {
        this.userIds = ids;
        this.totalListened = this.userIds.length;
        console.log('User IDs in parent:', this.userIds); // Verifica que aquí los IDs no estén vacíos
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
      }
    });
  }
}
