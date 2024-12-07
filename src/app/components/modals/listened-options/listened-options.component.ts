import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/backend/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listened-options',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listened-options.component.html',
  styleUrls: ['./listened-options.component.css'],
})
export class ListenedOptionsComponent implements OnInit {
  @Input() id_user: number | null = null;
  isModalOpen: boolean = false;
  isBestUsers: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usersService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });

    this.usersService.currentUserId$.subscribe((id) => {
      this.id_user = id;
    });
  }

  ngOnInit(): void {
    this.isModalOpen = false;

    // Verificar si la URL contiene /bestUsers
    this.isBestUsers = this.router.url.includes('/bestUsers');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
