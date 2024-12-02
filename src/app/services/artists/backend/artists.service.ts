import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { SpinnerService } from '../../others/spinner.service';
import { LoginResponse, RegisterData, UserResponse } from '../../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}


  //Obtener información de un artista
  getArtist(id_artist: number): Observable<{ id_artist: number, name: string, bio: string, photo: string }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ id_artist: number, name: string, bio: string, photo: string }>(
      `${this.apiUrl}/artists/get_artists/${id_artist}`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }
  
  
  //Obtener las canciones de un artista
  getArtistSongs(id_artist: number): Observable<{ id_song: number, photo: string }[]> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ id_song: number, photo: string }[]>(
      `${this.apiUrl}/artists/artist_songs/${id_artist}`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }

  //Obtener los álbumes de un artista
  getArtistAlbums(id_artist: number): Observable<{ id_album: number, photo: string }[]> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ id_album: number, photo: string }[]>(
      `${this.apiUrl}/artists/artist_albums/${id_artist}`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }
  






}
