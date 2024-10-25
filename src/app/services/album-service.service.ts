import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Album {
  id: number;
  title: string;
  artist: string;
  score: number;
}

export interface BestAlbumsResponse {
  best_albums: Album[];
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getBestAlbums(): Observable<BestAlbumsResponse> {
    return this.http.get<BestAlbumsResponse>(`${this.apiUrl}/albums/home_best_albums`);
  }
}