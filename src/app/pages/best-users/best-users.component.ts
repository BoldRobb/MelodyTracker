import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/backend/users.service';
import { SpinnerService } from '../../services/others/spinner.service';
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
    BtnViewMoreComponent
  ],
  templateUrl: './best-users.component.html',
  styleUrls: ['./best-users.component.css']
})
export class BestUsersComponent implements OnInit {

  topUsers: any[] = [];  // Para almacenar los top users
  userIds: number[] = [];  // Para almacenar los IDs de los usuarios

  constructor(
    private userService: UsersService, 
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadTopUsers();  // Cargar los usuarios más activos cuando el componente se inicializa
  }
  
  loadTopUsers(): void {
    this.userService.getTopUsers().subscribe(
      (data) => {
        console.log('Data from backend:', data);  // Verifica la estructura de los datos
        this.topUsers = data;
  
        // Asegúrate de que 'id_user' esté presente y es accesible
        this.userIds = this.topUsers.map(user => user.id_user);
        console.log('User IDs:', this.userIds);  // Verifica que los IDs están correctos
  
        // Si la longitud de los usuarios es mayor que 8, calcula los IDs restantes
        if (this.topUsers.length > 8) {
          this.userIds = this.topUsers.slice(8).map(user => user.id_user);
        }
  
        console.log('Remaining User IDs:', this.userIds);  // Verifica los IDs restantes
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

  // Función para obtener los usuarios restantes
  getRemainingUserIds(): number[] {
    const remainingUserIds = this.topUsers.slice(8).map(user => user.id_user);  // Usa 'id_user'
    console.log('Remaining User IDs:', remainingUserIds);  // Verifica los IDs restantes
    return remainingUserIds;
  }
}
