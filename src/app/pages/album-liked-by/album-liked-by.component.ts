import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';

@Component({
  selector: 'app-album-liked-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent],
  templateUrl: './album-liked-by.component.html',
  styleUrls: ['./album-liked-by.component.css']
})
export class AlbumLikedByComponent implements OnInit {
  totalLiked: number = 0; // Total de usuarios que han dado "like" al álbum
  userIds: number[] = []; // Lista de IDs de usuarios que han dado "like" al álbum
  loading: boolean = true; // Bandera de carga

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private albumService: AlbumService // Servicio para llamar al endpoint de álbum
  ) {}

  ngOnInit(): void {
    const id_album = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id_album) {
      this.fetchUsersWhoLikedAlbum(id_album); // Llamada al servicio para obtener los IDs de usuarios que han dado "like" al álbum
    }
  }
  
  // Método que usa el servicio getUsersLiked
  fetchUsersWhoLikedAlbum(idAlbum: number): void {
    this.albumService.getUsersLiked(idAlbum).subscribe({
      next: (userIds) => {
        this.userIds = userIds; // Asignamos los IDs de usuarios al arreglo userIds
        this.totalLiked = this.userIds.length; // Asignamos el total de usuarios que han dado "like" al álbum
        console.log('User IDs who have liked this album:', this.userIds); // Verifica los IDs de los usuarios
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users who liked this album:', err);
        this.loading = false;
      }
    });
  }
}
