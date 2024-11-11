import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

export interface Album {
  id_album: number;
  title: string;
  artist: string;
  score: number;
  photo: string;
}

export interface BestAlbumsResponse {
  best_albums: Album[];
}

export interface AlbumDetailsResponse {
  ratingCount: number;
  likes: number;
  listsCreated: number;
  comments: number;
  listens: number;
  name: string;
  id_artist: number;
  artist_name: string;
  photo: string;
  released: string;
  language: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  // -----------------------------------------------------------
  // Servicio para obtener los mejores álbumes
  getBestAlbums(): Observable<BestAlbumsResponse> {
    // Muestra el spinner antes de hacer la petición
    this.spinnerService.show();
    // console.log("Mostrando Spinner");

    // Realiza la petición HTTP
    return this.http.get<BestAlbumsResponse>(`${this.apiUrl}/albums/home_best_albums`).pipe(
      // Cuando la solicitud se complete, ya sea con éxito o con error, ocultamos el spinner
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }

  // -----------------------------------------------------------
  // Servicio para obtener la información completa de un álbum
  getAlbumDetails(id_album: number): Observable<AlbumDetailsResponse> {
    // Muestra el spinner antes de hacer la petición
    this.spinnerService.show();
    
    // Realiza la petición HTTP para obtener los detalles del álbum
    return this.http.get<AlbumDetailsResponse>(`${this.apiUrl}/albums/info_album/${id_album}`).pipe(
      // Cuando la solicitud se complete, ya sea con éxito o con error, ocultamos el spinner
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}
