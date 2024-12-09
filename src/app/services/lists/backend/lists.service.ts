import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../others/spinner.service';
import { ListCreateRequest, ListCreateResponse, ListDetailsResponse } from '../../../interfaces/lists';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private apiUrl = 'http://127.0.0.1:8000'; // Cambia por tu URL base

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  private UpdateLists = new Subject<void>(); // Crear el Subject para emitir cuando se actualicen los comentarios
  UpdateLists$ = this.UpdateLists.asObservable(); // Exponer el Observable para suscripción



  updateLists() {
    this.UpdateLists.next(); // Emitir la actualización de la lista de listas
  }

  createList(listData: ListCreateRequest): Observable<ListCreateResponse> {
    this.spinnerService.show();

    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token');
    console.log('Token desde localStorage:', token); // Depuración

    if (token) {
      try {
        // Decodificar el token para obtener el id_user
        const decodedToken: any = jwtDecode(token);
        console.log('Token decodificado:', decodedToken); // Depuración

        // Verifica que el id_user esté presente en el token
        const userId = decodedToken.id_user;
        if (!userId) {
          console.error('id_user no encontrado en el token');
          return throwError('id_user no encontrado en el token');  // Retorna un error si no existe id_user
        }

        // Agregar el id_user al listData
        listData.user_id = userId;

        // Crear los encabezados de la solicitud con el token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Llamada al backend para crear la lista con los encabezados
        return this.http.post<ListCreateResponse>(`${this.apiUrl}/lists/create_list/`, listData, { headers }).pipe(
          finalize(() => this.spinnerService.hide())
        );
      } catch (error) {
        console.error('Error decodificando el token:', error);
        return throwError('Error al decodificar el token');  // Manejo de errores
      }
    }

    return throwError('No token encontrado'); // Retorna un error si no hay token
  }


  // Servicio para obtener las listas de un usuario
  getNameListsOfUser(id_user: number): Observable<any[]> {
    this.spinnerService.show(); // Mostrar el spinner

    return this.http
      .get<any[]>(`${this.apiUrl}/lists/nameLists/${id_user}`)
      .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
  }




  // Método para agregar una canción a una lista
  addSongToList(id_list: number, id_song: number): Observable<any> {
    this.spinnerService.show(); // Mostrar el spinner mientras se hace la petición

    const songData = {
      id_list: id_list,
      id_song: id_song
    };

    return this.http
      .post<any>(`${this.apiUrl}/lists/addSongToList`, songData)
      .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
  }



// Servicio para obtener la información de una lista
getListInfo(id_list: number): Observable<any> {
  this.spinnerService.show(); // Mostrar el spinner mientras se hace la petición

  return this.http
    .get<any>(`${this.apiUrl}/lists/list_info/${id_list}`)
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


// Servicio para obtener las listas de un usuario
getInfoUserLists(id_user: number): Observable<any[]> {
  this.spinnerService.show(); // Mostrar el spinner mientras se hace la petición

  return this.http
    .get<any[]>(`${this.apiUrl}/lists/user_lists/${id_user}`)
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


// Método para obtener los detalles de una lista
getListDetails(id_list: number): Observable<ListDetailsResponse> {
  // Muestra el spinner antes de hacer la petición
  this.spinnerService.show();

  // Realiza la petición HTTP
  return this.http.get<ListDetailsResponse>(`${this.apiUrl}/lists/info_list/${id_list}`).pipe(
    // Oculta el spinner cuando la solicitud se complete
    finalize(() => {
      this.spinnerService.hide();
    })
  );
}




// Nuevo método para verificar si un usuario ha dado like a una lista
checkIfUserLikedList(id_list: number, id_user: number): Observable<{ has_liked: boolean }> {
  // Muestra el spinner antes de hacer la solicitud
  this.spinnerService.show();

  // Crear los parámetros de la solicitud
  const params = new HttpParams()
    .set('id_list', id_list.toString())
    .set('id_user', id_user.toString());

  // Realizar la solicitud GET al backend para verificar el like
  return this.http.get<{ has_liked: boolean }>(`${this.apiUrl}/lists/has_liked_list`, { params }).pipe(
    finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
  );
}


// Método para dar like a una lista
likeList(id_list: number, id_user: number): Observable<{ message: string }> {
  this.spinnerService.show();
  
  // Crear el objeto que se enviará al backend
  const likeData = {
    id_list: id_list,
    id_user: id_user
  };

  // Realizar la solicitud POST al backend
  return this.http.post<{ message: string }>(`${this.apiUrl}/lists/like_list`, likeData).pipe(
    finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
  );
}


// Método para quitar el like de una lista
unlikeList(id_list: number, id_user: number): Observable<{ message: string }> {
  this.spinnerService.show();  // Muestra el spinner

  // Crear el objeto que se enviará al backend
  const unlikeData = {
    id_list: id_list,
    id_user: id_user
  };

  // Realizar la solicitud DELETE al backend
  return this.http.delete<{ message: string }>(`${this.apiUrl}/lists/unlike_list`, {
    body: unlikeData
  }).pipe(
    finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando termine
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



// Servicio para verificar si un usuario ha rankeado una lista
hasRankList(id_user: number, id_list: number): Observable<{ has_rank: boolean, score: number | null, date: string | null }> {
  this.spinnerService.show(); // Mostrar el spinner

  return this.http
    .get<{ has_rank: boolean, score: number | null, date: string | null }>(
      `${this.apiUrl}/lists/has_rank_list/${id_user}/${id_list}`, // URL del endpoint
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner cuando termine
}


rankList(id_user: number, id_list: number, score: number): Observable<{ msg: string, rank_data: any }> {
  this.spinnerService.show(); // Mostrar el spinner

  const rankData = {
    id_user: id_user,
    id_list: id_list,
    score: score,
  };

  return this.http
    .post<{ msg: string, rank_data: any }>(
      `${this.apiUrl}/lists/rankList`, // Cambiar la ruta al endpoint de listas
      rankData,
      { headers: this.getAuthHeaders() } // Incluir las cabeceras de autorización
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


deleteRankedList(id_user: number, id_list: number): Observable<{ msg: string }> {
  this.spinnerService.show(); // Mostrar el spinner

  return this.http
    .delete<{ msg: string }>(
      `${this.apiUrl}/lists/rank_list/${id_user}/${id_list}`, // URL del endpoint
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


 // Servicio para obtener las canciones de una lista
 getSongsByList(id_list: number): Observable<{ id_list: number; id_song: number; name: string; photo: string }[]> {
  return this.http.get<{ id_list: number; id_song: number; name: string; photo: string }[]>(
    `${this.apiUrl}/lists/${id_list}/songs`
  );
}


// Servicio para reseñar listas
reviewList(id_user: number, id_list: number, comment: string): Observable<{ msg: string, review: any }> {
  this.spinnerService.show(); // Mostrar el spinner

  const reviewData = { id_user, id_list, comment };

  return this.http
    .post<{ msg: string, review: any }>(
      `${this.apiUrl}/lists/review_list`, 
      reviewData, 
      { headers: this.getAuthHeaders() } // Incluir el token en las cabeceras si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}



// Servicio para obtener los comentarios de una lista
getListComments(id_list: number): Observable<any[]> {
  this.spinnerService.show(); // Mostrar el spinner

  return this.http
    .get<any[]>(`${this.apiUrl}/lists/${id_list}/comments_list`, {
      headers: this.getAuthHeaders() // Incluir el token en las cabeceras si es necesario
    })
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


// Servicio para obtener el total de Likes de una Lista
getListLikeCount(id_list: number): Observable<{ id_list: number, likes_count: number }> {
  this.spinnerService.show();
  return this.http.get<{ id_list: number, likes_count: number }>(`${this.apiUrl}/lists/${id_list}/like_count`).pipe(
    finalize(() => this.spinnerService.hide())
  );
}


// Servicio para obtener el total de Reseñas de una Lista
getListReviewCount(id_list: number): Observable<{ id_list: number, reviews_count: number }> {
  this.spinnerService.show();
  return this.http.get<{ id_list: number, reviews_count: number }>(`${this.apiUrl}/lists/${id_list}/review_count`).pipe(
    finalize(() => this.spinnerService.hide())
  );
}


// Método para obtener el conteo de canciones en una lista
getListSongCount(id_list: number): Observable<{ id_list: number, songs_count: number }> {
  this.spinnerService.show();  // Mostrar el spinner mientras se hace la solicitud
  return this.http.get<{ id_list: number, songs_count: number }>(
    `${this.apiUrl}/lists/${id_list}/songs_count`
  ).pipe(
    finalize(() => this.spinnerService.hide())  // Ocultar el spinner cuando la solicitud termine
  );
}


// Método para obtener los usuarios que han dado like a una lista
getUsersLiked(id_list: number): Observable<number[]> {
  this.spinnerService.show(); // Muestra el spinner mientras se realiza la solicitud
  return this.http.get<number[]>(`${this.apiUrl}/lists/${id_list}/users_liked`).pipe(
    finalize(() => this.spinnerService.hide()) // Oculta el spinner cuando se termina la solicitud
  );
}


getListsWithSong(idSong: number): Observable<any> {
  this.spinnerService.show(); // Mostrar el spinner mientras se hace la solicitud
  return this.http.get<any>(`${this.apiUrl}/lists/lists_with_this_song/${idSong}`).pipe(
    finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando la solicitud termine
  );
}


likeReviewList(id_user: number, id_reviewed_list: number): Observable<{ message: string }> {
  this.spinnerService.show(); // Mostrar spinner mientras se realiza la solicitud

  return this.http
    .post<{ message: string }>(
      `${this.apiUrl}/lists/like_review_list/${id_user}/${id_reviewed_list}`,
      {},
      { headers: this.getAuthHeaders() } // Incluir cabeceras de autenticación si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}

unlikeReviewList(id_user: number, id_reviewed_list: number): Observable<{ message: string }> {
  this.spinnerService.show(); // Mostrar spinner mientras se realiza la solicitud

  return this.http
    .delete<{ message: string }>(
      `${this.apiUrl}/lists/unlike_review_list/${id_user}/${id_reviewed_list}`,
      { headers: this.getAuthHeaders() } // Incluir cabeceras de autenticación si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}

hasLikedReviewList(id_user: number, id_reviewed_list: number): Observable<{ has_liked: boolean }> {
  this.spinnerService.show(); // Mostrar spinner mientras se realiza la solicitud

  return this.http
    .get<{ has_liked: boolean }>(
      `${this.apiUrl}/lists/has_liked_review_list/${id_user}/${id_reviewed_list}`,
      { headers: this.getAuthHeaders() } // Incluir cabeceras de autenticación si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}

getLikesCountList(id_reviewed_list: number): Observable<{ likes_count: number }> {
  this.spinnerService.show(); // Mostrar spinner mientras se realiza la solicitud

  return this.http
    .get<{ likes_count: number }>(
      `${this.apiUrl}/lists/get_likes_count_review_list/${id_reviewed_list}`,
      { headers: this.getAuthHeaders() } // Incluir cabeceras de autenticación si es necesario
    )
    .pipe(finalize(() => this.spinnerService.hide())); // Ocultar el spinner al finalizar
}


// Método para buscar listas por nombre
searchLists(query: string): Observable<any[]> {
  this.spinnerService.show(); // Mostrar el spinner mientras se hace la solicitud

  return this.http.get<any[]>(`${this.apiUrl}/lists/search_lists/?query=${query}`).pipe(
    finalize(() => this.spinnerService.hide()) // Ocultar el spinner cuando la solicitud termine
  );
}

}
