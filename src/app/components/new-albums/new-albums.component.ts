import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album/backend/album-service.service'; // Asegúrate de tener el servicio adecuado
import { SpinnerService } from '../../services/others/spinner.service'; // Asegúrate de tener el servicio para mostrar el spinner
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new-albums.component.html',
  styleUrls: ['./new-albums.component.css']
})
export class NewAlbumsComponent implements OnInit {
  newAlbums: any[] = [];  // Para almacenar los álbumes nuevos

  constructor(private albumService: AlbumService, private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.getNewAlbums();  // Llamar al método para obtener los álbumes nuevos al cargar el componente
  }

  getNewAlbums(): void {
    this.albumService.getNewAlbums().subscribe(
      (albums) => {
        this.newAlbums = albums;  // Asignar los álbumes obtenidos al array
      },
      (error) => {
        console.error('Error al obtener los álbumes nuevos:', error);  // Manejar errores
      }
    );
  }
}
