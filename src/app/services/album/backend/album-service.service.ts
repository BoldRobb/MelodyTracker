import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../others/spinner.service';
import { finalize } from 'rxjs/operators';
import { BestAlbumsResponse, AlbumDetailsResponse  } from '../../../interfaces/album';




@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  // -----------------------------------------------------------
  //CONEXIÓN
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


  // Método para obtener el conteo de likes de un álbum
  getAlbumLikeCount(id_album: number): Observable<{ id_album: number, likes_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ id_album: number, likes_count: number }>(`${this.apiUrl}/albums/${id_album}/like_count`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }

  // Método para obtener el conteo de reviews de un álbum
  getAlbumReviewCount(id_album: number): Observable<{ id_album: number, reviews_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ id_album: number, reviews_count: number }>(`${this.apiUrl}/albums/${id_album}/review_count`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }

  // Método para obtener el conteo de usuarios que han escuchado un álbum
  getAlbumListenedCount(id_album: number): Observable<{ album_id: number, user_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ album_id: number, user_count: number }>(`${this.apiUrl}/albums/album_listened_count/${id_album}`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }




  // Método para dar like a un álbum
  likeAlbum(id_album: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();
    
    // Crear el objeto que se enviará al backend
    const likeData = {
      id_album: id_album,
      id_user: id_user
    };

    // Realizar la solicitud POST al backend
    return this.http.post<{ message: string }>(`${this.apiUrl}/albums/like_album`, likeData).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  // Método para quitar el like de un álbum
  unlikeAlbum(id_album: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();  // Muestra el spinner

    return this.http.delete<{ message: string }>(`${this.apiUrl}/albums/unlike_album`, {
      body: { id_album, id_user }
    }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  // Método para verificar si un usuario ha dado like a un álbum
  checkIfUserLikedAlbum(id_album: number, id_user: number): Observable<{ has_liked: boolean }> {
    this.spinnerService.show();

    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_album', id_album.toString())
      .set('id_user', id_user.toString());

    // Realizar la solicitud GET al backend para verificar el like
    return this.http.get<{ has_liked: boolean }>(`${this.apiUrl}/albums/has_liked_album`, { params }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  //ALBUM ESCUCHADO
  listenAlbum(id_album: number, id_user: number): Observable<{ message: string }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    
    const listenData = {
      id_album: id_album,id_user: id_user
    };
  
    return this.http.post<{ message: string }>(`${this.apiUrl}/albums/listened_album`, listenData, { headers }).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }

  
  //QUITAR ALBUM ESCUCHADO
  unlistenAlbum(id_album: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show();  // Muestra el spinner
  
    return this.http.delete<{ message: string }>(`${this.apiUrl}/albums/unlisten_album`, {
      body: { id_album, id_user }
    }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }



  // Método para verificar si un usuario ya ha escuchado un álbum
  checkIfUserListenedAlbum(id_album: number, id_user: number): Observable<{ has_listened: boolean }> {
    this.spinnerService.show();
  
    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_album', id_album.toString())
      .set('id_user', id_user.toString());
  
    // Realizar la solicitud GET al backend para verificar si el álbum fue escuchado
    return this.http.get<{ has_listened: boolean }>(`${this.apiUrl}/albums/has_listened_album`, { params }).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }
  

  addAlbumToWatchlist(id_album: number, id_user: number): Observable<{ msg: string; user_id: number; album_id: number }> {
    this.spinnerService.show(); // Mostrar el spinner
  
    // Crear el objeto para la solicitud POST
    const albumData = {
      id_album: id_album,
      id_user: id_user
    };
  
    return this.http.post<{ msg: string; user_id: number; album_id: number }>(
      `${this.apiUrl}/albums/add_album_watchlist`,
      albumData
    ).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }

  
  isAlbumInWatchlist(id_album: number, id_user: number): Observable<{ is_in_watchlist: boolean }> {
    this.spinnerService.show(); // Mostrar el spinner
  
    // Crear los parámetros de la solicitud
    const params = new HttpParams()
      .set('id_album', id_album.toString())
      .set('id_user', id_user.toString());
  
    return this.http.get<{ is_in_watchlist: boolean }>(
      `${this.apiUrl}/albums/is_album_in_watchlist`,
      { params }
    ).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }


  removeAlbumFromWatchlist(id_album: number, id_user: number): Observable<{ message: string }> {
    this.spinnerService.show(); // Mostrar el spinner
  
    // Crear el cuerpo de la solicitud DELETE
    const albumData = {
      id_album: id_album,
      id_user: id_user
    };
  
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/albums/remove_album_watchlist`,
      { body: albumData }
    ).pipe(
      finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
    );
  }
    

  getWatchlistAlbumsByUser(id_user: number): Observable<{ watchlist_albums: any[] }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se hace la solicitud
  
    return this.http.get<{ watchlist_albums: any[] }>(`${this.apiUrl}/albums/watchlist_albums_user/${id_user}`).pipe(
      finalize(() => this.spinnerService.hide())  // Ocultar el spinner cuando termine la solicitud
    );
  }
  

  // Servicio para obtener la información de los álbumes escuchados
  getTotalAlbumsListenedInfo(id_user: number): Observable<any> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<any>(`${this.apiUrl}/albums/total_albums_listened_info/${id_user}`).pipe(
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

// Servicio para calificar el álbum
rankAlbum(id_user: number, id_album: number, score: number): Observable<{ msg: string, rank_data: any }> {
  this.spinnerService.show(); // Mostrar el spinner

  const rankData = {
    id_user: id_user,
    id_album: id_album,
    score: score,
  };

  return this.http
    .post<{ msg: string, rank_data: any }>(
      `${this.apiUrl}/albums/rankAlbum`,
      rankData,
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner cuando termine
}

// Servicio para eliminar el ranking de un álbum
deleteRankedAlbum(id_user: number, id_album: number): Observable<{ msg: string }> {
  this.spinnerService.show(); // Mostrar el spinner

  return this.http
    .delete<{ msg: string }>(
      `${this.apiUrl}/albums/rankAlbum/${id_user}/${id_album}`,
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}

// Servicio para verificar si un usuario ha rankeado un álbum
hasRankAlbum(id_user: number, id_album: number): Observable<{ has_rank: boolean, score: number | null }> {
  this.spinnerService.show(); // Mostrar el spinner

  return this.http
    .get<{ has_rank: boolean, score: number | null }>(
      `${this.apiUrl}/albums/hasRankAlbum?id_user=${id_user}&id_album=${id_album}`,
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner cuando termine
}


// Servicio para obtener los comentarios de un álbum
getAlbumComments(id_album: number): Observable<any[]> {
  this.spinnerService.show(); // Mostrar el spinner

  return this.http
    .get<any[]>(`${this.apiUrl}/albums/${id_album}/comments_album`, {
      headers: this.getAuthHeaders() // Incluir el token en las cabeceras si es necesario
    })
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


// Servicio para agregar un comentario a un álbum
reviewAlbum(id_user: number, id_album: number, comment: string): Observable<{ msg: string, review: any }> {
  this.spinnerService.show(); // Mostrar el spinner

  const reviewData = { id_user, id_album, comment };

  return this.http
    .post<{ msg: string, review: any }>(
      `${this.apiUrl}/albums/review_album`, reviewData,
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


// Servicio para obtener las canciones de un álbum
getSongsOnAlbum(id_album: number): Observable<{ songs: any[] }> {
  return this.http.get<{ songs: any[] }>(`${this.apiUrl}/albums/songsOnAlbum/${id_album}`);
}


// Método para obtener los IDs de usuarios que han escuchado un álbum
getUsersListened(id_album: number): Observable<number[]> {
  this.spinnerService.show(); // Muestra el spinner mientras se realiza la solicitud
  return this.http.get<number[]>(`${this.apiUrl}/albums/${id_album}/users_listened`).pipe(
    finalize(() => this.spinnerService.hide()) // Oculta el spinner cuando se termina la solicitud
  );
}


getUsersLiked(id_album: number): Observable<number[]> {
  this.spinnerService.show(); // Muestra el spinner mientras se realiza la solicitud
  return this.http.get<number[]>(`${this.apiUrl}/albums/${id_album}/users_liked`).pipe(
    finalize(() => this.spinnerService.hide()) // Oculta el spinner cuando se termina la solicitud
  );
}


}
