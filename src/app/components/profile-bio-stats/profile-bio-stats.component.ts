import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-bio-stats',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Importar FormsModule
  templateUrl: './profile-bio-stats.component.html',
  styleUrls: ['./profile-bio-stats.component.css']
})
export class ProfileBioStatsComponent implements OnInit {
  bio: string = 'Sin biografía disponible.';
  totalRanked: number = 0;
  totalReview: number = 0;
  isEditMode: boolean = false; // Indica si estamos en modo edición
  idProfile: number | null = null;

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
      this.idProfile = +params['id'];
      if (this.idProfile && !isNaN(this.idProfile)) {
        this.loadUserStats(this.idProfile);
      } else {
        this.errorMessage = 'ID de perfil no válido.';
      }
    });

    if (this.idProfile !== null) {
      this.getStatsTotalUser(this.idProfile);
    }
  }

  onBioChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.bio = textarea.value; // Actualiza la biografía con el nuevo valor
  }

  loadUserStats(idProfile: number): void {
    this.userService.getProfileBioStats(idProfile).subscribe({
      next: stats => {
        this.bio = stats.bio || 'Sin biografía disponible.';
      },
      error: err => {
        console.error('Error fetching user stats:', err);
        this.errorMessage = 'No se pudieron cargar las estadísticas del usuario.';
      }
    });
  }

  getStatsTotalUser(idProfile: number): void {
    this.userService.getUserTotals(idProfile).subscribe({
      next: response => {
        this.totalRanked = response.total_ranked;
        this.totalReview = response.total_reviews;
      },
      error: error => {
        console.error('Error fetching user stats:', error);
      }
    });

  }


}
