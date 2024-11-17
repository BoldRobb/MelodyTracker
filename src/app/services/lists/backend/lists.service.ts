import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../others/spinner.service';
import { ListCreateRequest, ListCreateResponse } from '../../../interfaces/lists';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private apiUrl = 'http://127.0.0.1:8000'; // Cambia por tu URL base

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

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
}
