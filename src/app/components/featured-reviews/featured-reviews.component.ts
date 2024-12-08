import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/others/spinner.service'; // Asegúrate de importar el servicio spinner
import { SongService } from '../../services/song/backend/song.service'; // Asegúrate de importar tu servicio de reviews
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-reviews.component.html',
  styleUrls: ['./featured-reviews.component.css']
})
export class FeaturedReviewsComponent implements OnInit {
  // Variables para determinar qué tipo de vista mostrar
  isSong: boolean = false;
  isAlbum: boolean = false;
  isList: boolean = false;

  // Variable para almacenar los reviews
  topReviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,  // Inyectamos el servicio
    private spinnerService: SpinnerService // Inyectamos el servicio de spinner
  ) {}

  ngOnInit(): void {
    // Obtener la URL y verificar qué tipo de ruta es
    const currentUrl = this.route.snapshot.url.join('/');

    // Asignar el valor de las variables según la URL
    this.isSong = currentUrl.includes('song');
    this.isAlbum = currentUrl.includes('album');
    this.isList = currentUrl.includes('list');

    // Si estamos en la página de canción, obtener el ID de la canción desde la URL
    if (this.isSong) {
      this.route.params.subscribe(params => {
        const songId = +params['id'];  // Usamos '+' para convertir el parámetro de cadena a número
        this.getTopReviews(songId); // Llamamos al método para obtener los reviews con el songId
      });
    }
  }

  // Método para obtener los 3 reviews con más likes
  getTopReviews(songId: number): void {
    this.spinnerService.show(); // Mostrar el spinner mientras se realiza la solicitud

    this.songService.getTopReviews(songId)
      .pipe(finalize(() => this.spinnerService.hide())) // Ocultar el spinner al finalizar
      .subscribe(
        (reviews) => {
          this.topReviews = reviews; // Asignar los reviews a la variable topReviews
        },
        (error) => {
          console.error('Error al obtener los reviews:', error);
        }
      );
  }
}
