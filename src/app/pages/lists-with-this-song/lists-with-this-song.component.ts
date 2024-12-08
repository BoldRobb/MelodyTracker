import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../services/lists/backend/lists.service';
import { ListWithThisSongComponent } from '../../components/list-with-this-song/list-with-this-song.component';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DatosSongAlbumComponent } from "../../components/datos-song-album/datos-song-album.component";
import { StatTotalComponent } from "../../components/stat-total/stat-total.component";

@Component({
  selector: 'app-lists-with-this-song',
  standalone: true,
  imports: [ListWithThisSongComponent, CommonModule, DatosSongAlbumComponent, StatTotalComponent],
  templateUrl: './lists-with-this-song.component.html',
  styleUrls: ['./lists-with-this-song.component.css']
})
export class ListsWithThisSongComponent implements OnInit {
  listsData: any[] = [];  // Guardará la lista de datos recibidos
  totalLists: number = 0;  // Contador de listas
  loading: boolean = false;  // Para mostrar un indicador de carga

  constructor(
    private listsService: ListsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idSong = this.getIdFromRoute();  // Obtener el id de la URL
    if (idSong) {
      this.getListsWithSong(idSong);
    } else {
      console.error('No se encontró el parámetro id en la URL');
    }
  }

  // Método para obtener el id de la canción desde la URL
  getIdFromRoute(): number | null {
    const idSong = this.route.snapshot.paramMap.get('id');
    return idSong ? Number(idSong) : null;
  }

  // Método para obtener las listas que contienen la canción
  getListsWithSong(idSong: number): void {
    this.loading = true;  // Activar el spinner
    this.listsService.getListsWithSong(idSong).pipe(
      finalize(() => {
        this.loading = false;  // Desactivar el spinner cuando se complete
      })
    ).subscribe({
      next: (response) => {
        console.log('Datos recibidos:', response);  // Ver los datos que estás recibiendo
        if (response && response.lists && Array.isArray(response.lists)) {
          this.listsData = response.lists;  // Asignar los datos al arreglo si es una lista
          this.totalLists = this.listsData.length;  // Actualizar el total de listas
        } else {
          console.error('La respuesta no tiene la estructura esperada', response);
        }
      },
      error: (err) => {
        console.error('Error al obtener las listas:', err);
      }
    });
  }
}
