import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { FollowsComponent } from "../../components/follows/follows.component";
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { BestUserComponent } from "../../components/best-user/best-user.component";
import { BtnViewMoreComponent } from "../../components/btn-view-more/btn-view-more.component";

@Component({
  selector: 'app-best-users',
  standalone: true,
  imports: [
    FollowsComponent,
    EncabezadoComponent,
    BestUserComponent,
    BtnViewMoreComponent,
  ],
  templateUrl: './best-users.component.html',
  styleUrls: ['./best-users.component.css'],
})
export class BestUsersComponent implements OnInit {
  topUsers: any[] = []; // Para almacenar los top users
  remainingUserIds: number[] = []; // IDs de los usuarios restantes

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
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
        console.error('Error fetching top users:', error);
      }
    );
  }

  // Función para obtener los primeros 8 usuarios
  getTop8Users(): any[] {
    return this.topUsers.slice(0, 8);
  }
}
