import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { FollowsComponent } from "../../components/follows/follows.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { UsersService } from '../../services/users/backend/users.service';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [EncabezadoComponent, FollowsComponent, BtnViewMoreComponent],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  userIds: number[] = []; // Lista de IDs a pasar al componente <app-follows>
  idUser: number = 0; // ID del usuario extraído de la URL
  loading: boolean = true; // Bandera para manejar el estado de carga

  constructor(
    private route: ActivatedRoute,
    private followsService: UsersService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario desde la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idUser = +id; // Convertir a número
        this.fetchFollowersUsers();
      }
    });
  }

  fetchFollowersUsers(): void {
    this.followsService.getFollowersUsers(this.idUser).subscribe({
      next: (ids) => {
        this.userIds = ids; // Guardar la lista de IDs para pasarla a <app-follows>
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener seguidores:', err);
        this.loading = false;
      }
    });
  }
}
