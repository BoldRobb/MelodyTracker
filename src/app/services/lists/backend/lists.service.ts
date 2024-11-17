import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../others/spinner.service';
import { ListCreateRequest, ListCreateResponse } from '../../../interfaces/lists';


@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL base de tu API

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  // Método para crear una nueva lista
  createList(listData: ListCreateRequest): Observable<ListCreateResponse> {
    this.spinnerService.show();
    return this.http.post<ListCreateResponse>(`${this.apiUrl}/lists/create_list/`, listData).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }
}
