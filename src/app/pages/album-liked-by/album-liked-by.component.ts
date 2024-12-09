import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';
import { ListenedOptionsComponent } from "../../components/modals/listened-options/listened-options.component";
import { UsersService } from '../../services/users/backend/users.service';

@Component({
  selector: 'app-album-liked-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent, ListenedOptionsComponent],
  templateUrl: './album-liked-by.component.html',
  styleUrls: ['./album-liked-by.component.css']
})
export class AlbumLikedByComponent implements OnInit {
  totalLiked: number = 0; // Total de usuarios que han dado "like" al álbum
  userIds: number[] = []; // Lista de IDs de los usuarios que han dado "like" al álbum
  loading: boolean = true; // Bandera de carga
  selectedUserId: number | null = null; // ID del usuario seleccionado para mostrar el modal

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private albumService: AlbumService, // Servicio para llamar al endpoint de álbum
    private followsService: UsersService // Servicio para manejar el modal
  ) {}

  ngOnInit(): void {
    const id_album = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id_album) {
      this.fetchUsersWhoLikedAlbum(id_album); // Llamada al servicio para obtener los usuarios que han dado "like" al álbum
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

        this.loading = false;
      }
    });
  }

  // Abre el modal con el id del usuario seleccionado
  openModalLikedOptions(id_user: number): void {
    this.selectedUserId = id_user;
    this.followsService.openModalListenedOptions(); // Llamar al servicio para abrir el modal
    this.followsService.setCurrentUserId(id_user); // Establecer el id del usuario en el servicio
  }

  // Cierra el modal
  closeModal(): void {
    this.selectedUserId = null; // Resetear el id cuando se cierra el modal
    this.followsService.closeModalListenedOptions();
  }
}
