import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-datos-user',
  standalone: true,
  imports: [],
  templateUrl: './profile-datos-user.component.html',
  styleUrl: './profile-datos-user.component.css'
})
export class ProfileDatosUserComponent implements OnInit {
  userProfile = {
    username: '',
    photo: null as string | null,
    songs_listened: 0,
    total_following: 0,
    total_followers: 0,
  };

  isFollowed = false;
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
        this.loadUserProfile(this.idProfile);

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
      next: response => {
        this.isFollowed = response.is_following;
      },
      error: err => {
        console.error('Error checking follow status:', err);
      }
    });
  }

  toggleFollow(): void {
    if (this.isFollowed) {
      this.unfollowUser();
    } else {
      this.followUser();
    }
  }

  followUser(): void {
    if (!this.idUser || !this.idProfile) return;

    this.userService.followUser({ id_user: this.idProfile, id_follower: this.idUser }).subscribe({
      next: () => {
        this.isFollowed = true;
        this.userProfile.total_followers += 1;
      },
      error: err => {
        console.error('Error following user:', err);
      }
    });
  }

  unfollowUser(): void {
    if (!this.idUser || !this.idProfile) return;

    this.userService.unfollowUser({ id_user: this.idProfile, id_follower: this.idUser }).subscribe({
      next: () => {
        this.isFollowed = false;
        this.userProfile.total_followers -= 1;
      },
      error: err => {
        console.error('Error unfollowing user:', err);
      }
    });
  }

  loadUserProfile(idProfile: number): void {
    this.userService.profileDatosUser(idProfile).subscribe({
      next: profile => {
        if (!profile || !profile.username) {
          this.router.navigate(['/404']);
          return;
        }
        this.userProfile = profile;
      },
      error: error => {
        console.error('Error fetching user profile:', error);
        this.router.navigate(['/404']);
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
