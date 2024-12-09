import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { FollowsComponent } from "../../components/follows/follows.component";
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { BestUserComponent } from "../../components/best-user/best-user.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";
import { ListenedOptionsComponent } from "../../components/modals/listened-options/listened-options.component";
import { ActivatedRoute, Router } from '@angular/router'; // Importamos estos servicios

@Component({
  selector: 'app-best-users',
  standalone: true,
  imports: [
    FollowsComponent,
    EncabezadoComponent,
    BestUserComponent,
    BtnViewMoreComponent,
    ListenedOptionsComponent
  ],
  templateUrl: './best-users.component.html',
  styleUrls: ['./best-users.component.css'],
})
export class BestUsersComponent implements OnInit {
  topUsers: any[] = []; // Para almacenar los top users
  remainingUserIds: number[] = []; // IDs de los usuarios restantes
  selectedUserId: number | null = null; // Guardará el id del usuario seleccionado para mostrar el modal
  isHomepage: boolean = false; // Variable para verificar si estamos en la ruta de homepage

  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Verificar si estamos en la ruta /homepage
    this.isHomepage = this.router.url === '/homepage'; // Comparar la ruta actual

    this.loadTopUsers(); // Cargar los usuarios más activos cuando el componente se inicializa
  }

  loadTopUsers(): void {
    this.userService.getTopUsers().subscribe(
      (data) => {
        console.log('Data from backend:', data); // Verifica la estructura de los datos
        this.topUsers = data;

        // Obtener los IDs de los usuarios restantes
        if (this.topUsers.length > 8) {
          this.remainingUserIds = this.topUsers.slice(8).map(user => user.id_user);
        }
        console.log('Remaining User IDs:', this.remainingUserIds); // Verifica los IDs restantes
      },
      (error) => {
        // Manejar error
      }
    );
  }

  // Función para obtener los primeros 8 usuarios
  getTop8Users(): any[] {
    return this.topUsers.slice(0, 8);
  }

  // Abre el modal con el id del usuario seleccionado
  openModalListenedOptions(id_user: number): void {
    this.selectedUserId = id_user;
    this.userService.openModalListenedOptions(); // Abrir el modal
    this.userService.setCurrentUserId(id_user); // Establecer el id del usuario en el servicio
  }

  // Cierra el modal
  closeModal(): void {
    this.selectedUserId = null; // Resetear el id cuando se cierra el modal
    this.userService.closeModalListenedOptions();
  }
}
