import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  // Método para quitar una canción de la lista de reproducción de un usuario
  addSongToWatchlist(id_song: number, id_user: number): Observable<{ msg: string; user_id: number; song_id: number }> {
    this.spinnerService.show(); // Mostrar el spinner
  
    // Crear el objeto para la solicitud POST
    const songData = {
      id_song: id_song,
      id_user: id_user
    };
  
    return this.http.post<{ msg: string; user_id: number; song_id: number }>(`${this.apiUrl}/songs/add_song_watchlist`,
      songData
    ).pipe(
      finalize(() => this.spinnerService.hide()) 
    );
  }
  

  isSongInWatchlist(id_song: number, id_user: number): Observable<{ is_in_watchlist: boolean }> {
    this.spinnerService.show(); // Mostrar el spinner
  
    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_song', id_song.toString())
      .set('id_user', id_user.toString());
  
    return this.http.get<{ is_in_watchlist: boolean }>(
      `${this.apiUrl}/songs/is_song_in_watchlist`,
      { params }
    ).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }

  
  removeSongFromWatchlist(id_song: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show(); // Mostrar el spinner
  
    // Crear el cuerpo de la solicitud DELETE
    const songData = {
      id_song: id_song,
      id_user: id_user
    };
  
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/songs/remove_song_watchlist`,
      { body: songData }
    ).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  // Servicio para obtener la información de las canciones escuchadas
  getTotalSongsListenedInfo(id_user: number): Observable<any> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<any>(`${this.apiUrl}/songs/total_songs_listened_info/${id_user}`).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }
  
  
   // Función para obtener el token desde localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('access_token'); // Obtener el token del localStorage
  }

  // Función para agregar el token en los encabezados
  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  // Servicio para calificar una canción
  rankSong(id_user: number, id_song: number, score: number): Observable<{ msg: string, id_user: number, id_song: number }> {
    this.spinnerService.show(); // Mostrar el spinner

    const rankData = {
      id_song: id_song,
      score: score
    };

    return this.http
      .post<{ msg: string, id_user: number, id_song: number }>(
        `${this.apiUrl}/songs/rank_song/${id_user}`,
        rankData,
        { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras
      )
      .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
  }


  // Servicio para eliminar el ranking de una canción
  deleteRankedSong(id_user: number, id_song: number): Observable<{ msg: string }> {
    this.spinnerService.show(); // Mostrar el spinner

    return this.http
      .delete<{ msg: string }>(
        `${this.apiUrl}/songs/rank_song/${id_user}/${id_song}`,
        { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras
      )
      .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
  }


  // Servicio para verificar si un usuario ha rankeado una canción
  hasRankSong(id_user: number, id_song: number): Observable<{ has_rank: boolean, score: number | null, date: string | null }> {
    this.spinnerService.show(); // Mostrar el spinner

    return this.http
      .get<{ has_rank: boolean, score: number | null, date: string | null }>(
        `${this.apiUrl}/songs/has_rank_song/${id_user}/${id_song}`,
        { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras si es necesario
      )
      .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner cuando termine
  }


  // Servicio para obtener los comentarios de una canción
  getComments(id_song: number): Observable<any[]> {
    this.spinnerService.show(); // Mostrar el spinner

    return this.http
      .get<any[]>(
        `${this.apiUrl}/songs/${id_song}/comments_song`,
        { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras si es necesario
      )
      .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
  }



}
