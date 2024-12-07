import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service'; // Asegúrate de importar el servicio
import { SpinnerService } from '../../services/others/spinner.service'; // Asegúrate de importar el spinner service
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-history',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.css']
})
export class ProfileHistoryComponent implements OnInit {
  id_user: number = 8;  // Se establece el id_user como 8
  recentActivities: any = []; // Para almacenar las actividades obtenidas
  loading: boolean = false;

  constructor(
    private usersService: UsersService, // Inyectamos el servicio
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id_user = +params['id'];
    });
    this.getRecentActivities();


    
  }

  // Método para obtener las actividades recientes del usuario
  getRecentActivities(): void {
    this.loading = true;
    this.usersService.getHistoryProfile(this.id_user).pipe(
      finalize(() => {
        this.loading = false;
        console.log('Activities: ', this.recentActivities);
      })
    ).subscribe(
      (data) => {
        this.recentActivities = data; // Asignamos los datos obtenidos
      },
      (error) => {
        console.error('Error fetching activities', error);
        // Manejo de errores si es necesario
      }
    );
  }
}
