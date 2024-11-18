import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service'; // Servicio para obtener los datos del usuario
import { ActivatedRoute, Router } from '@angular/router'; // Para obtener el ID de la URL y redirigir
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: { 
    username: string, 
    photo: string | null, 
    songs_listened: number, 
    total_following: number, 
    total_followers: number 
  } = {
    username: '',
    photo: null,
    songs_listened: 0,
    total_following: 0,
    total_followers: 0
  };

  bio: string | null = null;
  totalRanked: number = 0;
  totalReview: number = 0;

  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private userService: UsersService, 
    private route: ActivatedRoute, 
    private router: Router // Inyectar el Router para redirigir a 404
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL y cargar el perfil
    this.route.params.subscribe(params => {
      const idUser = +params['id']; // Convierte el parámetro 'id' a número
      if (idUser && !isNaN(idUser)) {
        this.loadUserProfile(idUser); // Llamar al servicio para cargar el perfil
        this.loadUserStats(idUser); // Llamar al servicio para cargar las estadísticas
      } else {
        this.router.navigate(['/404']); // Redirigir a 404 si el ID no es válido
      }
    });
  }

  loadUserProfile(idUser: number): void {
    this.isLoading = true; // Inicia la carga
    this.userService.profileDatosUser(idUser).subscribe(
      profile => {
        if (!profile || !profile.username) { // Si el perfil no tiene datos válidos
          this.router.navigate(['/404']); // Redirigir a la página 404
          return;
        }
        this.userProfile = profile; // Asigna los datos del perfil al objeto 'userProfile'
        this.isLoading = false; // Termina la carga
      },
      error => {
        console.error('Error fetching user profile:', error);
        if (error.status === 404) { // Si el backend devuelve un error 404
          this.router.navigate(['/404']); // Redirigir a la página 404
        } else {
          this.errorMessage = 'No se pudo obtener el perfil del usuario';
        }
        this.isLoading = false; // Termina la carga en caso de error
      }
    );
  }

  loadUserStats(idUser: number): void {
    this.userService.getProfileBioStats(idUser).subscribe({
      next: (stats) => {
        this.bio = stats.bio;
        this.totalRanked = stats.total_ranked_songs_albums;
        this.totalReview = stats.total_reviews_songs_albums;
        console.log('User stats:', stats);
      },
      error: (err) => {
        console.error('Error fetching user stats:', err);
        this.errorMessage = 'No se pudieron cargar las estadísticas del usuario';
      }
    });
  }
}
