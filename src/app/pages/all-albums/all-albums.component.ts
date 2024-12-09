import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.css'],
})
export class AllAlbumsComponent implements OnInit {
  allAlbums: any[] = []; // Almacena los álbumes cargados
  currentPage: number = 1; // Página actual para paginación
  pageSize: number = 28; // Tamaño de página (28 álbumes por página)
  loading: boolean = false; // Indicador de carga
  totalAlbums: number = 0; // Número total de álbumes

  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.loadAlbums(); // Cargar los primeros álbumes al inicializar
  }

  loadAlbums() {
    if (this.loading) return; // Evitar solicitudes duplicadas
    this.loading = true;

    this.albumService.getAllAlbums().subscribe(
      (albums) => {
        // Actualizar el contador de álbumes totales
        this.totalAlbums = albums.length;

        // Calcular los índices de inicio y fin para la página actual
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = this.currentPage * this.pageSize;

        // Obtener los álbumes para la página actual
        const newAlbums = albums.slice(startIndex, endIndex);

        // Agregar los nuevos álbumes al arreglo existente
        this.allAlbums.push(...newAlbums);

        // Incrementar el número de página
        this.currentPage++;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar los álbumes:', error);
        this.loading = false;
      }
    );
  }

  // Método para verificar si todos los álbumes han sido cargados
  get allAlbumsLoaded(): boolean {
    return this.allAlbums.length >= this.totalAlbums;
  }
}
