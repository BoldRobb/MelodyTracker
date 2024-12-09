import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users/backend/users.service';// Importa el servicio

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('inputSearch') inputSearch!: ElementRef;
  private routerSubscription!: Subscription;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    // Suscribirse a los eventos de navegación
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Limpiar el input al cambiar de página
        if (this.inputSearch) {
          this.inputSearch.nativeElement.value = '';
        }
      }
    });
  }

  search(inputValue: string): void {
    if (inputValue.trim()) {
      const query = inputValue.trim().replace(/\s+/g, '+');
      this.usersService.setSearchQuery(query); // Usar el servicio para actualizar la búsqueda
      this.router.navigate(['/results', query]);
    }
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
