import { Component } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-bio-stats',
  standalone: true,
  templateUrl: './profile-bio-stats.component.html',
  styleUrls: ['./profile-bio-stats.component.css']
})
export class ProfileBioStatsComponent {
  bio: string = 'Sin biografía disponible.';
  totalRanked: number = 0;
  totalReview: number = 0;

  errorMessage: string | null = null;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idProfile = +params['id'];
      if (idProfile && !isNaN(idProfile)) {
        this.loadUserStats(idProfile);
      } else {
        this.errorMessage = 'ID de perfil no válido.';
      }
    });
  }

  loadUserStats(idProfile: number): void {
    this.userService.getProfileBioStats(idProfile).subscribe({
      next: stats => {
        this.bio = stats.bio || 'Sin biografía disponible.';
        this.totalRanked = stats.total_ranked_songs_albums || 0;
        this.totalReview = stats.total_reviews_songs_albums || 0;
      },
      error: err => {
        console.error('Error fetching user stats:', err);
        this.errorMessage = 'No se pudieron cargar las estadísticas del usuario.';
      }
    });
  }
}
