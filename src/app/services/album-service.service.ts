import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

export interface Album {
  id: number;
  title: string;
  artist: string;
  score: number;
  photo: string;
}

export interface BestAlbumsResponse {
  best_albums: Album[];
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  getBestAlbums(): Observable<BestAlbumsResponse> {
    // Muestra el spinner antes de hacer la petición
    this.spinnerService.show();
    console.log("Mostrando Spinner");

    // Realiza la petición HTTP
    return this.http.get<BestAlbumsResponse>(`${this.apiUrl}/albums/home_best_albums`).pipe(
      // Cuando la solicitud se complete, ya sea con éxito o con error, ocultamos el spinner
      finalize(() => {
        //this.spinnerService.hide();
      })
    );
  }
}
