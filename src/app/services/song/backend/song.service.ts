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

  // -----------------------------------------------------------
  // Nuevo método para obtener detalles de la canción
  getSongDetails(id_song: number): Observable<SongDetailsResponse> {
    this.spinnerService.show();
    return this.http.get<SongDetailsResponse>(`${this.apiUrl}/songs/info_song/${id_song}`).pipe(
      finalize(() => this.spinnerService.hide())
    );
  }
}
