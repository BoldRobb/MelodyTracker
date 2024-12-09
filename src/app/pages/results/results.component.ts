import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users/backend/users.service';  // Importa el servicio
import { Subscription } from 'rxjs';
import { ArtistResultsComponent } from "./artist-results/artist-results.component";
import { SongResultsComponent } from "./song-results/song-results.component";
import { AlbumResultsComponent } from "./album-results/album-results.component";
import { ListResultsComponent } from "./list-results/list-results.component";
import { UserResultsComponent } from "./user-results/user-results.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  imports: [ArtistResultsComponent, SongResultsComponent, AlbumResultsComponent, ListResultsComponent, UserResultsComponent, CommonModule],
})
export class ResultsComponent implements OnInit, OnDestroy {
  query: string = '';  // Variable para almacenar la búsqueda formateada
  private searchQuerySubscription!: Subscription;
  selectedFilter: string = '';  // Variable para controlar el filtro seleccionado, inicializada en vacío

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // Suscribirse al servicio para obtener la última búsqueda
    this.searchQuerySubscription = this.usersService.searchQuery$.subscribe(
      (query) => {
        this.query = query.replace(/\+/g, ' '); // Reemplaza '+' con espacios
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  toggleFilter(filter: string): void {
    // Alterna entre mostrar o esconder los resultados por filtro
    if (this.selectedFilter === filter) {
      this.selectedFilter = '';  // Si ya está seleccionado, quitar la selección
    } else {
      this.selectedFilter = filter;  // Si no está seleccionado, seleccionarlo
    }
  }
}
