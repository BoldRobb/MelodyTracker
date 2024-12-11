import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css']
})
export class RecomendationsComponent implements OnInit {
  recommendedSongs: any[] = []; // Asegura que esté inicializado como un array vacío
  userId!: number; // ID del usuario, se obtendrá dinámicamente

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUserIdFromToken();
    this.fetchRecommendedSongs();
  }

  // Obtiene el ID del usuario desde el localStorage
  getUserIdFromToken(): void {
    const accessToken = localStorage.getItem('access_token'); // Obtén el token desde el localStorage

    if (accessToken) {
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1])); // Decodifica el payload del token
        this.userId = tokenPayload.id_user; // Extrae el id_user del payload
      } catch (error) {
        console.error('Error parsing access token:', error);
      }
    } else {
      console.error('Access token not found in localStorage.');
    }
  }

  // Llama al servicio para obtener las canciones recomendadas
  fetchRecommendedSongs(): void {
    if (!this.userId) {
      console.error('User ID is not available.');
      return;
    }

    this.usersService.getRecommendedSongs(this.userId).subscribe({
      next: (songs) => {
        this.recommendedSongs = songs; // Asigna las canciones al arreglo si existen
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
        this.recommendedSongs = []; // Asegura que no se muestre nada si ocurre un error
      }
    });
  }
}
