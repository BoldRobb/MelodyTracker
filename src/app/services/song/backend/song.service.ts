import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../others/spinner.service';
import { finalize, tap } from 'rxjs/operators';
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

  // Método para dar like a una canción
  likeSong(id_song: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();
    
    // Crear el objeto que se enviará al backend
    const likeData = {
      id_song: id_song,
      id_user: id_user
    };

    // Realizar la solicitud POST al backend
    return this.http.post<{ message: string }>(`${this.apiUrl}/songs/like_song`, likeData).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }

  // Método para quitar el like de una canción
  unlikeSong(id_song: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();  // Muestra el spinner

    return this.http.delete<{ message: string }>(`${this.apiUrl}/songs/unlike_song`, {
      body: { id_song, id_user }
    }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }

  // Nuevo método para verificar si un usuario ha dado like a una canción
  checkIfUserLikedSong(id_song: number, id_user: number): Observable<{ has_liked: boolean }> {
    this.spinnerService.show();

    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_song', id_song.toString())
      .set('id_user', id_user.toString());

    // Realizar la solicitud GET al backend para verificar el like
    return this.http.get<{ has_liked: boolean }>(`${this.apiUrl}/songs/has_liked_song`, { params }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  // Método para marcar una canción como escuchada
  listenSong(id_song: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();
    
    // Crear el objeto que se enviará al backend
    const listenData = {
      id_song: id_song,
      id_user: id_user
    };

    // Realizar la solicitud POST al backend
    return this.http.post<{ message: string }>(`${this.apiUrl}/songs/listen_song`, listenData).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  // Método para quitar la marca de canción escuchada
  unlistenSong(id_song: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();  // Muestra el spinner

    return this.http.delete<{ message: string }>(`${this.apiUrl}/songs/unlisten_song`, {
      body: { id_song, id_user }
    }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }

  // Método para verificar si un usuario ya ha escuchado una canción
  checkIfUserListenedSong(id_song: number, id_user: number): Observable<{ has_listened: boolean }> {
    this.spinnerService.show();

    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_song', id_song.toString())
      .set('id_user', id_user.toString());

    // Realizar la solicitud GET al backend para verificar si la canción fue escuchada
    return this.http.get<{ has_listened: boolean }>(`${this.apiUrl}/songs/has_listened_song`, { params }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }

  // Método para obtener las canciones de la lista de reproducción de un usuario
  getWatchlistSongsByUser(id_user: number): Observable<{ watchlist_songs: any[] }> {
    this.spinnerService.show();
    return this.http.get<{ watchlist_songs: any[] }>(`${this.apiUrl}/songs/watchlist_songs_user/${id_user}`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }



  addSongToWatchlist(id_song: number, id_user: number): Observable<{ msg: string, user_id: number, song_id: number }> {
    const watchlistData = { id_song, id_user };
    return this.http.post<{ msg: string, user_id: number, song_id: number }>(
      `${this.apiUrl}/songs/add_song_watchlist`,
      watchlistData
    ).pipe(
      finalize(() => this.spinnerService.hide()),
      tap(response => console.log('Respuesta de addSongToWatchlist:', response))  // Verifica la respuesta
    );
  }
  

  
  checkIfSongInWatchlist(id_song: number, id_user: number): Observable<{ is_in_watchlist: boolean }> {
    // Muestra el spinner mientras se realiza la operación
    this.spinnerService.show();
  
    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_song', id_song.toString())
      .set('id_user', id_user.toString());
  
    // Realizar la solicitud GET al backend para verificar si la canción está en la watchlist
    return this.http.get<{ is_in_watchlist: boolean }>(
      `${this.apiUrl}/songs/is_song_in_watchlist`,
      { params }
    ).pipe(
      // Ocultar el spinner cuando finalice la operación
      finalize(() => this.spinnerService.hide())
    );
  }
  


  
  // Método para quitar la canción de la watchlist
  removeSongFromWatchlist(id_song: number, id_user: number): Observable<{ msg: string, user_id: number, song_id: number }> {
    this.spinnerService.show();  // Muestra el spinner mientras se realiza la operación
    
    // Crear el objeto con los datos necesarios
    const watchlistData = {
      id_song: id_song,
      id_user: id_user
    };
  
    // Realizar la solicitud DELETE al backend para quitar la canción de la watchlist
    return this.http.delete<{ msg: string, user_id: number, song_id: number }>(
      `${this.apiUrl}/songs/remove_song_watchlist`,
      { body: watchlistData }
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Ocultar el spinner cuando termine
    );
  }

}
