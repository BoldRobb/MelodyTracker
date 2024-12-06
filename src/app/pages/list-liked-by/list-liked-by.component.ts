import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../services/lists/backend/lists.service';// Importamos el nuevo servicio
import { DatosSongAlbumComponent } from '../../components/datos-song-album/datos-song-album.component';
import { StatTotalComponent } from '../../components/stat-total/stat-total.component';
import { FollowsComponent } from '../../components/follows/follows.component';

@Component({
  selector: 'app-list-liked-by',
  standalone: true,
  imports: [DatosSongAlbumComponent, StatTotalComponent, FollowsComponent],
  templateUrl: './list-liked-by.component.html',
  styleUrls: ['./list-liked-by.component.css']
})
export class ListLikedByComponent implements OnInit {
  totalLiked: number = 0; // Total de usuarios que han dado "like" a la lista
  userIds: number[] = []; // Lista de IDs de usuarios que han dado "like" a la lista
  loading: boolean = true; // Bandera de carga

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private listsService: ListsService // Servicio para llamar al endpoint de lista
  ) {}

  ngOnInit(): void {
    const id_list = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id_list) {
      this.fetchUsersWhoLikedList(id_list); // Llamada al servicio para obtener los IDs de usuarios que han dado "like" a la lista
    }
  }
  
  // Método que usa el servicio getUsersLiked para obtener los usuarios que dieron like a una lista
  fetchUsersWhoLikedList(idList: number): void {
    this.listsService.getUsersLiked(idList).subscribe({
      next: (userIds) => {
        this.userIds = userIds; // Asignamos los IDs de usuarios al arreglo userIds
        this.totalLiked = this.userIds.length; // Asignamos el total de usuarios que han dado "like" a la lista
        console.log('User IDs who have liked this list:', this.userIds); // Verifica los IDs de los usuarios
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users who liked this list:', err);
        this.loading = false;
      }
    });
  }
}
