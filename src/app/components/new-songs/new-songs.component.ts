import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song/backend/song.service';// Asegúrate de tener el servicio adecuado
import { SpinnerService } from '../../services/others/spinner.service'; // Asegúrate de tener el servicio para mostrar el spinner
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-songs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new-songs.component.html',
  styleUrls: ['./new-songs.component.css']
})
export class NewSongsComponent implements OnInit {
  newSongs: any[] = []; // Para almacenar las canciones nuevas

  constructor(private songService: SongService, private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.getNewSongs(); // Llamar al método para obtener las canciones nuevas al cargar el componente
  }

  getNewSongs(): void {
    this.songService.getNewSongs().subscribe(
      (songs) => {
        this.newSongs = songs;  // Asignar las canciones obtenidas al array
      },
      (error) => {
        console.error('Error al obtener las canciones nuevas:', error);  // Manejar errores
      }
    );
  }
}
