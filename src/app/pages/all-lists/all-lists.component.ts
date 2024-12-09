import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists/backend/lists.service'; // Importar el servicio de listas
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-lists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css'],
})
export class AllListsComponent implements OnInit {
  allLists: any[] = []; // Almacena las listas cargadas
  currentPage: number = 1; // Página actual para paginación
  pageSize: number = 28; // Tamaño de página (28 listas por página)
  loading: boolean = false; // Indicador de carga
  totalLists: number = 0; // Número total de listas

  constructor(private listsService: ListsService) {}

  ngOnInit() {
    this.loadLists(); // Cargar las primeras listas al iniciar
  }

  loadLists() {
    if (this.loading) return; // Evitar solicitudes duplicadas
    this.loading = true;

    this.listsService.getAllLists().subscribe(
      (lists) => {
        // Actualizar el total de listas
        this.totalLists = lists.length;

        // Calcular los índices de inicio y fin para la página actual
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = this.currentPage * this.pageSize;

        // Obtener las listas para la página actual
        const newLists = lists.slice(startIndex, endIndex);

        // Agregar nuevas listas al array existente
        this.allLists.push(...newLists);

        // Incrementar el número de página
        this.currentPage++;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar las listas:', error);
        this.loading = false;
      }
    );
  }

  // Método para comprobar si todas las listas han sido cargadas
  get allListsLoaded(): boolean {
    return this.allLists.length >= this.totalLists;
  }
}
