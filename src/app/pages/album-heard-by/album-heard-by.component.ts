import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';

@Component({
  selector: 'app-album-heard-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent],
  templateUrl: './album-heard-by.component.html',
  styleUrls: ['./album-heard-by.component.css']
})
export class AlbumHeardByComponent implements OnInit {
  totalListened: number = 0; // Total de usuarios que han escuchado el álbum
  userIds: number[] = []; // Lista de IDs de usuarios que han escuchado el álbum
  loading: boolean = true; // Bandera de carga

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private albumService: AlbumService // Servicio para llamar al endpoint de álbum
  ) {}

  ngOnInit(): void {
    const id_album = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id_album) {
      this.fetchUsersWhoHeardAlbum(id_album); // Llamada al servicio para obtener los IDs de usuarios que han escuchado el álbum
    }
  }
  
  // Método que usa el servicio getUsersListened
  fetchUsersWhoHeardAlbum(idAlbum: number): void {
    this.albumService.getUsersListened(idAlbum).subscribe({
      next: (userIds) => {
        this.userIds = userIds; // Asignamos los IDs de usuarios al arreglo userIds
        this.totalListened = this.userIds.length; // Asignamos el total de usuarios que han escuchado el álbum
        console.log('User IDs who have listened to this album:', this.userIds); // Verifica los IDs de los usuarios
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users who heard the album:', err);
        this.loading = false;
      }
    });
  }
}
