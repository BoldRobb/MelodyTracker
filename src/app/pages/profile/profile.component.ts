import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileDatosUserComponent } from "../../components/profile-datos-user/profile-datos-user.component";
import { ProfileBioStatsComponent } from "../../components/profile-bio-stats/profile-bio-stats.component";
import { ProfileHistoryComponent } from "../../components/profile-history/profile-history.component";
import { ProfilePopularListsComponent } from "../../components/profile-popular-lists/profile-popular-lists.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileDatosUserComponent, ProfileBioStatsComponent, ProfileHistoryComponent, ProfilePopularListsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: {
    username: string;
    photo: string | null;
    songs_listened: number;
    total_following: number;
    total_followers: number;
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

  idUser: number | null = null;
  idProfile: number | null = null;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idUser = this.getUserIdFromToken(); // Extraer el id del token
  
    // Obtener el parámetro 'id' de la URL y cargar el perfil
    this.route.params.subscribe(params => {
      this.idProfile = +params['id'];
      if (this.idProfile && !isNaN(this.idProfile)) {
        this.loadUserProfile(this.idProfile); // Llamar al servicio para cargar el perfil
        this.loadUserStats(this.idProfile); // Llamar al servicio para cargar las estadísticas
  
        // Verificar si el usuario sigue al perfil
        if (this.idUser) {
          this.checkIfUserIsFollowed(this.idProfile, this.idUser);
        }
      } else {
        this.router.navigate(['/404']); // Redirigir a 404 si el ID no es válido
      }
    });
  }


  
  checkIfUserIsFollowed(idProfile: number, idUser: number): void {
    this.userService.isUserFollowing(idProfile, idUser).subscribe({
      next: (response) => {
        this.isFollowed = response.is_following; // Configura el estado inicial
      },
      error: (err) => {

        this.errorMessage = 'No se pudo verificar el estado de seguimiento';
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
    const idProfile = +this.route.snapshot.params['id']; // Obtener el id del usuario a seguir
    if (!this.idUser) return;

    this.userService.followUser({ id_user: idProfile, id_follower: this.idUser }).subscribe({
      next: () => {
        this.isFollowed = true;
        this.userProfile.total_followers += 1; // Incrementa el número de seguidores
      },
      error: err => {

        this.errorMessage = 'No se pudo seguir al usuario';
      }
    });
  }

  unfollowUser(): void {
    const idProfile = +this.route.snapshot.params['id']; // Obtener el id del usuario a dejar de seguir
    if (!this.idUser) return;

    this.userService.unfollowUser({ id_user: idProfile, id_follower: this.idUser }).subscribe({
      next: () => {
        this.isFollowed = false;
        this.userProfile.total_followers -= 1; // Decrementa el número de seguidores
      },
      error: err => {

        this.errorMessage = 'No se pudo dejar de seguir al usuario';
      }
    });
  }

  loadUserProfile(idProfile: number): void {
    this.isLoading = true;
    this.userService.profileDatosUser(idProfile).subscribe(
      profile => {
        if (!profile || !profile.username) {
          this.router.navigate(['/404']);
          return;
        }
        this.userProfile = profile;
        this.isLoading = false;
      },
      error => {

        if (error.status === 404) {
          this.router.navigate(['/404']);
        } else {
          this.errorMessage = 'No se pudo obtener el perfil del usuario';
        }
        this.isLoading = false;
      }
    );
  }

  loadUserStats(idProfile: number): void {
    this.userService.getProfileBioStats(idProfile).subscribe({
      next: stats => {
        this.bio = stats.bio;
        this.totalRanked = stats.total_ranked_songs_albums;
        this.totalReview = stats.total_reviews_songs_albums;

      },
      error: err => {

        this.errorMessage = 'No se pudieron cargar las estadísticas del usuario';
      }
    });
  }

  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1]; // Extraer la parte del payload del token
      const payload = JSON.parse(atob(payloadBase64)); // Decodificar el payload
      return payload.id_user || null; // Devuelve el `id_user` si existe
    } catch (error) {

      return null;
    }
  }
}
