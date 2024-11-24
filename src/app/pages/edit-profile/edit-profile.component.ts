import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importa Location
import { ProfileDatosUserComponent } from "../../components/profile-datos-user/profile-datos-user.component";
import { ProfileBioStatsComponent } from "../../components/profile-bio-stats/profile-bio-stats.component";
import { ProfileHistoryComponent } from "../../components/profile-history/profile-history.component";
import { ProfilePopularListsComponent } from "../../components/profile-popular-lists/profile-popular-lists.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ProfileDatosUserComponent, ProfileBioStatsComponent, ProfileHistoryComponent, ProfilePopularListsComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'] // Asegúrate de usar el nombre correcto de tu archivo CSS
})
export class EditProfileComponent implements OnInit {

  @ViewChild(ProfileBioStatsComponent) profileBioStatsComponent!: ProfileBioStatsComponent; // Referencia al componente hijo

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
    private router: Router,
    private location: Location // Inyectamos Location para poder usar la navegación atrás
  ) {}

  ngOnInit(): void {
    this.idUser = this.getUserIdFromToken(); // Extraer el id del token

    // Obtener el parámetro 'id' de la URL y validar
    this.route.params.subscribe(params => {
      this.idProfile = +params['id'];

      // Si el idProfile no es válido o no coincide con el idUser, redirige a 404
      if (isNaN(this.idProfile) || this.idProfile !== this.idUser) {
        this.router.navigate(['/404']); // Redirigir a 404
        return;
      }

      // Cargar el perfil y las estadísticas si el id es válido
      this.loadUserProfile(this.idProfile);
      this.loadUserStats(this.idProfile);

      // Verificar si el usuario sigue al perfil
      if (this.idUser) {
        this.checkIfUserIsFollowed(this.idProfile, this.idUser);
      }
    });
  }

  saveBio(): void {
    if (this.profileBioStatsComponent && this.bio !== null && this.idUser !== null) {
      const newBio = this.profileBioStatsComponent.bio.trim();

      this.userService.updateBio(this.idUser, newBio).subscribe({
        next: (response) => {
          console.log('Biografía actualizada:', response.bio);
          this.bio = response.bio; // Actualiza la bio localmente
          alert('Biografía guardada con éxito.');
        },
        error: (err) => {
          console.error('Error actualizando la biografía:', err);
          alert('Error al guardar la biografía.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.location.back(); // Navega hacia la página anterior en el historial
  }

  checkIfUserIsFollowed(idProfile: number, idUser: number): void {
    this.userService.isUserFollowing(idProfile, idUser).subscribe({
      next: (response) => {
        this.isFollowed = response.is_following;
      },
      error: (err) => {
        console.error('Error checking follow status:', err);
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
    const idProfile = +this.route.snapshot.params['id'];
    if (!this.idUser) return;

    this.userService.followUser({ id_user: idProfile, id_follower: this.idUser }).subscribe({
      next: () => {
        this.isFollowed = true;
        this.userProfile.total_followers += 1;
      },
      error: err => {
        console.error('Error following user:', err);
        this.errorMessage = 'No se pudo seguir al usuario';
      }
    });
  }

  unfollowUser(): void {
    const idProfile = +this.route.snapshot.params['id'];
    if (!this.idUser) return;

    this.userService.unfollowUser({ id_user: idProfile, id_follower: this.idUser }).subscribe({
      next: () => {
        this.isFollowed = false;
        this.userProfile.total_followers -= 1;
      },
      error: err => {
        console.error('Error unfollowing user:', err);
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

  loadUserStats(idProfile: number): void {
    this.userService.getProfileBioStats(idProfile).subscribe({
      next: stats => {
        this.bio = stats.bio;
        this.totalRanked = stats.total_ranked_songs_albums;
        this.totalReview = stats.total_reviews_songs_albums;
        console.log('User stats:', stats);
      },
      error: err => {
        console.error('Error fetching user stats:', err);
        this.errorMessage = 'No se pudieron cargar las estadísticas del usuario';
      }
    });
  }

  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload.id_user || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
