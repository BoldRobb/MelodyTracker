import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/backend/users.service'; 

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent implements OnInit {
  userDetails: { username?: string; photo?: string; watchlist_count?: number } | null = null;
  isLoading = false;
  isWatchlist = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      // Verifica si la URL contiene el segmento 'watchlist' seguido de un ID
      this.isWatchlist = segments.length > 1 && segments[0].path === 'watchlist';
      const id_user = this.isWatchlist ? +segments[1].path : null;
      if (id_user) {
        this.getUserDetails(id_user);
      }
    });
  }

  getUserDetails(id_user: number): void {
    this.isLoading = true;
    this.usersService.detailsEncabezadoWatchlistSong(id_user).subscribe({
      next: (data) => {
        this.userDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user details', err);
        this.isLoading = false;
      }
    });
  }
}