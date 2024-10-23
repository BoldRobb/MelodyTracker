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
  private apiUrl = 'https://api.example.com/albums';

  constructor(private http: HttpClient) {}

  getBestAlbums(): Observable<BestAlbumsResponse> {
    return this.http.get<BestAlbumsResponse>(`${this.apiUrl}/best`);
  }
}