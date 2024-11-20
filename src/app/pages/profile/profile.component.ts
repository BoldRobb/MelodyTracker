import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service'; // Ya lo tienes
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule], 
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
  isFollowed = false;
  errorMessage: string | null = null;

  constructor(
    private userService: UsersService, 
    private route: ActivatedRoute, 
    private router: Router
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

  toggleFollow() {
    if (this.isFollowed) {
      this.unfollowUser();
    } else {
      this.followUser();
    }
  }

  followUser(): void {
    const idUser = +this.route.snapshot.params['id']; // Obtener el id del usuario al que se va a seguir
    const idFollower = 1; // Aquí asumes que el ID del seguidor es 1, reemplázalo por el ID real

    this.userService.followUser({ id_user: idUser, id_follower: idFollower }).subscribe({
      next: () => {
        this.isFollowed = true;
        this.userProfile.total_followers += 1; // Incrementa el número de seguidores
      },
      error: (err) => {
        console.error('Error following user:', err);
        this.errorMessage = 'No se pudo seguir al usuario';
      }
    });
  }

  unfollowUser(): void {
    const idUser = +this.route.snapshot.params['id']; // Obtener el id del usuario al que se va a dejar de seguir
    const idFollower = 1; // Aquí asumes que el ID del seguidor es 1, reemplázalo por el ID real

    this.userService.unfollowUser({ id_user: idUser, id_follower: idFollower }).subscribe({
      next: () => {
        this.isFollowed = false;
        this.userProfile.total_followers -= 1; // Decrementa el número de seguidores
      },
      error: (err) => {
        console.error('Error unfollowing user:', err);
        this.errorMessage = 'No se pudo dejar de seguir al usuario';
      }
    });
  }

  loadUserProfile(idUser: number): void {
    this.isLoading = true;
    this.userService.profileDatosUser(idUser).subscribe(
      profile => {
        if (!profile || !profile.username) {
          this.router.navigate(['/404']);
          return;
        }
        this.userProfile = profile;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user profile:', error);
        if (error.status === 404) {
          this.router.navigate(['/404']);
        } else {
          this.errorMessage = 'No se pudo obtener el perfil del usuario';
        }
        this.isLoading = false;
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
