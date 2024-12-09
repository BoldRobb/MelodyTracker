import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service';
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';
import { ListenedOptionsComponent } from "../../components/modals/listened-options/listened-options.component";
import { UsersService } from '../../services/users/backend/users.service';

@Component({
  selector: 'app-song-heard-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent, ListenedOptionsComponent],
  templateUrl: './song-heard-by.component.html',
  styleUrls: ['./song-heard-by.component.css']
})
export class SongHeardByComponent implements OnInit {
  totalListened: number = 0; // Total de usuarios que han escuchado la canción
  userIds: number[] = []; // Lista de IDs a pasar al componente <app-follows>
  loading: boolean = true; // Bandera de carga
  selectedUserId: number | null = null; // ID del usuario seleccionado para mostrar el modal

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private songService: SongService, // Servicio para llamar al endpoint
    private followsService: UsersService // Servicio para manejar el modal
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

        this.loading = false;
      }
    });
  }

  // Abre el modal con el id del usuario seleccionado
  openModalListenedOptions(id_user: number): void {
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
