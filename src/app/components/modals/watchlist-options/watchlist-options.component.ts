import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/backend/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-watchlist-options',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './watchlist-options.component.html',
  styleUrl: './watchlist-options.component.css'
})
export class WatchlistOptionsComponent implements OnInit {
  @Input() id_user: number | null = null;
  isModalOpen: boolean = false;
  isBestUsers: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usersService.isModalWatchlistOpen$.subscribe((state) => {
      this.isModalOpen = state;
    });

  }

  ngOnInit(): void {
    this.isModalOpen = false;
    this.isBestUsers = this.router.url.includes('/bestUsers');
  
    // Aquí se suscribe a la variable observable
    this.usersService.isModalWatchlistOpen$.subscribe((state) => {
      this.isModalOpen = state;
    });
  }
  

  openModalWatchlist() {
    this.isModalOpen = true;
  }

  closeModalWatchlist() {
    this.isModalOpen = false;
  }
}
