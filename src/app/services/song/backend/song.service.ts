import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../others/spinner.service';
import { finalize } from 'rxjs/operators';
import { SongDetailsResponse } from '../../../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  // Método para obtener detalles de la canción
  getSongDetails(id_song: number): Observable<SongDetailsResponse> {
    this.spinnerService.show();
    return this.http.get<SongDetailsResponse>(`${this.apiUrl}/songs/info_song/${id_song}`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }

  // Método para obtener el conteo de likes de una canción
  getSongLikeCount(id_song: number): Observable<{ id_song: number, likes_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ id_song: number, likes_count: number }>(`${this.apiUrl}/songs/${id_song}/like_count`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }

  // Método para obtener el conteo de reviews de una canción
  getSongReviewCount(id_song: number): Observable<{ id_song: number, reviews_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ id_song: number, reviews_count: number }>(`${this.apiUrl}/songs/${id_song}/review_count`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }


   // Método para obtener el conteo de usuarios que han escuchado una canción
   getSongListenedCount(id_song: number): Observable<{ song_id: number, user_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ song_id: number, user_count: number }>(`${this.apiUrl}/songs/song_listened_count/${id_song}`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }


}
