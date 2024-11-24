import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-bio-stats',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar FormsModule
  templateUrl: './profile-bio-stats.component.html',
  styleUrls: ['./profile-bio-stats.component.css']
})
export class ProfileBioStatsComponent implements OnInit {
  bio: string = 'Sin biografía disponible.';
  totalRanked: number = 0;
  totalReview: number = 0;
  isEditMode: boolean = false; // Indica si estamos en modo edición

  errorMessage: string | null = null;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Determinar si estamos en modo edición
    this.isEditMode = this.router.url.startsWith('/editProfile/');

    this.route.params.subscribe(params => {
      const idProfile = +params['id'];
      if (idProfile && !isNaN(idProfile)) {
        this.loadUserStats(idProfile);
      } else {
        this.errorMessage = 'ID de perfil no válido.';
      }
    });
  }

  onBioChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.bio = textarea.value; // Actualiza la biografía con el nuevo valor
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
