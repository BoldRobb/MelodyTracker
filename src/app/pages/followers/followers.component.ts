import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { FollowsComponent } from "../../components/follows/follows.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { UsersService } from '../../services/users/backend/users.service';
import { ListenedOptionsComponent } from "../../components/modals/listened-options/listened-options.component";

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [EncabezadoComponent, FollowsComponent, BtnViewMoreComponent, ListenedOptionsComponent],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  userIds: number[] = []; // Lista de IDs a pasar al componente <app-follows>
  idUser: number = 0; // ID del usuario extraído de la URL
  loading: boolean = true; // Bandera para manejar el estado de carga
  selectedUserId: number | null = null; // Guardará el id del usuario seleccionado para mostrar el modal

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
