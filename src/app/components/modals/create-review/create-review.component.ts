import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song/backend/song.service';

@Component({
  selector: 'app-create-review',
  standalone: true,
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  title: string = '';
  artist: string = '';
  releaseYear: number = 0;
  albumCover: string = '';
  isVisible: boolean = false;

  currentDate: string = ''; // Nueva propiedad para la fecha actual

  constructor(private songService: SongService) {}

  ngOnInit() {
    // Obtener y formatear la fecha actual
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Suscribirse a los datos del servicio
    this.songService.currentData.subscribe((data) => {
      this.title = data.title;
      this.artist = data.artist;
      this.releaseYear = data.releaseYear;
      this.albumCover = data.albumCover;
    });

    console.log('Datos del servicio:', this.title, this.artist, this.releaseYear, this.albumCover);
  }

  openModal() {
    this.isVisible = true; // Muestra el modal
  }

  closeModal() {
    this.isVisible = false; // Oculta el modal
  }
}
