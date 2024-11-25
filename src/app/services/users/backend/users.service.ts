import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { SpinnerService } from '../../others/spinner.service';
import { LoginResponse, RegisterData, UserResponse } from '../../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}


  // Método para obtener el username y la photo del usuario
  getUsernameAndPhoto(id_user: number): Observable<{ username: string, photo: string }> {
    this.spinnerService.show();  // Mostrar spinner mientras se carga la respuesta
    return this.http.get<{ username: string, photo: string }>(`${this.apiUrl}/users/${id_user}/profile_photo_username`).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner una vez obtenida la respuesta
    );
  }


  // Método de login
  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
  
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/token`, body.toString(), { headers })
      .pipe(
        map((response) => {
          localStorage.setItem('access_token', response.access_token);
          console.log('Token guardado:', response.access_token); // Verifica que el token se guarda correctamente
          return response.access_token;
        })
      );
  }

  // Método para registrar al usuario
  registerNewUser(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/users/createUser`, formData);
  }

  getNewToken(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    
    return this.http.post(`${this.apiUrl}/users/token`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  // Método de registro de usuario
  registerUser(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/users/createUser`, data);
  }

  // Obtener el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Definir un BehaviorSubject para el estado de login
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 

  // Verificar si el token es válido
  checkToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('access_token');
    
      if (!token) {
        this.isLoggedInSubject.next(false);
        console.log('Token no encontrado, isLoggedIn:', false);
        return;
      }
    
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      // Validar el token
      this.http.get(`${this.apiUrl}/users/me`, { headers }).subscribe({
        next: () => {
          this.isLoggedInSubject.next(true);
          console.log('Token válido, isLoggedIn después de set(true):', true);
        },
        error: (error) => {
          this.isLoggedInSubject.next(false);
          console.log('Token inválido o error en la petición:', error);
          console.log('isLoggedIn después de set(false):', false);
        }
      });
    }
  }


  

  // Cerrar sesión y limpiar el token
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access_token');
      this.isLoggedInSubject.next(false);
    }
  }

  // Método para obtener los datos del usuario logueado
  getCurrentUser(): Observable<UserResponse> {
    const token = localStorage.getItem('access_token'); // Obtener el token del localStorage
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluir el token en los headers
    });
  
    // Indicamos que la respuesta será un arreglo de objetos de tipo UserResponse
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users/me`, { headers }).pipe(
      map(response => response[0]) // Extraemos el primer objeto del arreglo
    );
  }

  // Método para obtener solo el ID del usuario
  getUserId(): Observable<number> {
    return this.getCurrentUser().pipe(
      map(user => user.id_user) // Extraemos solo el id_user
    );
  }

  // Método para obtener el nombre de usuario
  getUsername(): Observable<any> {
    return this.getCurrentUser().pipe(
      map(user => user.username) // Extraer solo el username
    );
  }
  
  // Verificar si el usuario está logueado
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Método para obtener los detalles del encabezado de la watchlist
  detailsEncabezadoWatchlistSong(id_user: number): Observable<{ username: string, photo: string, watchlist_count: number }> {
    this.spinnerService.show();
    return this.http.get<{ username: string, photo: string, watchlist_count: number }>(`${this.apiUrl}/songs/user/${id_user}/details_encabezado`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }



  // Servicio para obtener los detalles del encabezado de la watchlist de álbumes
  detailsEncabezadoWatchlistAlbum(id_user: number): Observable<{ username: string, photo: string, watchlist_album_count: number }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ username: string, photo: string, watchlist_album_count: number }>(
      `${this.apiUrl}/users/${id_user}/details_encabezado_watchlist_album`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }


  // Servicio para obtener los detalles del encabezado de las canciones escuchadas
  detailsEncabezadoSongsListened(id_user: number): Observable<{ username: string, photo: string, listened_songs_count: number }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ username: string, photo: string, listened_songs_count: number }>(
      `${this.apiUrl}/songs/user/${id_user}/details_encabezado_songs_listened`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }



  // Servicio para obtener los detalles del encabezado de los álbumes escuchados
  detailsEncabezadoAlbumsListened(id_user: number): Observable<{ username: string, photo: string, listened_albums_count: number }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ username: string, photo: string, listened_albums_count: number }>(
      `${this.apiUrl}/albums/user/${id_user}/details_encabezado_albums_listened`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }


  // Servicio para obtener los detalles del encabezado de los following
  detailsEncabezadoFollowing(id_user: number): Observable<{ username: string, photo: string, total_following: number }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ username: string, photo: string, total_following: number }>(
      `${this.apiUrl}/users/${id_user}/details_encabezado_following`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }


  // Servicio para obtener los detalles del encabezado de los followers
  detailsEncabezadoFollowers(id_user: number): Observable<{ username: string, photo: string, total_followers: number }> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<{ username: string, photo: string, total_followers: number }>(
      `${this.apiUrl}/users/${id_user}/details_encabezado_followers`
    ).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }




   // Método para obtener los detalles del perfil del usuario y su actividad musical
   profileDatosUser(id_user: number): Observable<{ username: string, photo: string | null, songs_listened: number, total_following: number, total_followers: number }> {
    this.spinnerService.show(); // Muestra el spinner mientras se carga la información
    return this.http.get<{ username: string, photo: string | null, songs_listened: number, total_following: number, total_followers: number }>(`${this.apiUrl}/users/profile_datos_user/${id_user}`).pipe(
      finalize(() => this.spinnerService.hide()) // Oculta el spinner cuando la solicitud haya terminado
    );
  }


  getProfileBioStats(id_user: number): Observable<{ bio: string | null, total_ranked_songs_albums: number, total_reviews_songs_albums: number }> {
    return this.http.get<{ bio: string | null, total_ranked_songs_albums: number, total_reviews_songs_albums: number }>(
      `${this.apiUrl}/users/profile_bio_stats/${id_user}`
    );
  }


   // Servicio para seguir a un usuario
   followUser(data: { id_user: number; id_follower: number }): Observable<any> {
    const token = this.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.post(`${this.apiUrl}/users/follow_user/`, data, { headers });
  }

  // Servicio para dejar de seguir a un usuario
  unfollowUser(data: { id_user: number; id_follower: number }): Observable<any> {
    const token = this.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.delete(`${this.apiUrl}/users/unfollow_user/`, {
      headers,
      body: data, // En DELETE, el cuerpo debe pasarse de esta forma
    });
  }



  getFollowingUsers(id_user: number): Observable<number[]> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<number[]>(`${this.apiUrl}/users/following/${id_user}`).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }


  getFollowersUsers(id_user: number): Observable<number[]> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<number[]>(`${this.apiUrl}/users/followers/${id_user}`).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }


  // Servicio para obtener los detalles de los usuarios seguidores
  getUsersDetails(userIds: number[]): Observable<any> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga

    return this.http
      .post<any>(`${this.apiUrl}/users/details_following`, { user_ids: userIds })
      .pipe(
        finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
      );
  }


  isUserFollowing(id_user: number, id_follower: number): Observable<{ is_following: boolean }> {
    this.spinnerService.show(); // Mostrar el spinner mientras se carga
    return this.http.get<{ is_following: boolean }>(
      `${this.apiUrl}/users/is_following/?id_user=${id_user}&id_follower=${id_follower}`
    ).pipe(
      finalize(() => this.spinnerService.hide()) // Esconde el spinner cuando la solicitud termina
    );
  }



   // Servicio para obtener los usuarios más activos
   getTopUsers(): Observable<any[]> {
    this.spinnerService.show();  // Mostrar el spinner mientras se carga
    return this.http.get<any[]>(`${this.apiUrl}/users/top_users`).pipe(
      finalize(() => this.spinnerService.hide())  // Esconde el spinner cuando la solicitud termina
    );
  }



  updateBio(id_user: number, newBio: string): Observable<{ message: string; bio: string }> {
    this.spinnerService.show(); // Mostrar el spinner mientras se realiza la solicitud
    return this.http
      .put<{ message: string; bio: string }>(`${this.apiUrl}/users/${id_user}/update_bio`, { new_bio: newBio })
      .pipe(
        finalize(() => this.spinnerService.hide()) // Esconder el spinner cuando la solicitud termine
      );
  }


  updateUsername(id_user: number, newUsername: string): Observable<{ message: string; username: string }> {
    this.spinnerService.show(); // Mostrar el spinner mientras se realiza la solicitud
    return this.http
      .put<{ message: string; username: string }>(
        `${this.apiUrl}/users/${id_user}/update_username`, 
        { new_username: newUsername }
      )
      .pipe(
        finalize(() => this.spinnerService.hide()) // Esconder el spinner cuando la solicitud termine
      );
  }




}
