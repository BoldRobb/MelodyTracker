import { Component, Input, OnInit } from '@angular/core';
import { AlbumService, BestAlbumsResponse, Album } from '../../services/album-service.service';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';









@Component({
  selector: 'app-gridrow',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './gridrow.component.html',
  styleUrl: './gridrow.component.css'
})

export class GridrowComponent implements OnInit {
  @Input() columns: number = 8; // Número de columnas por defecto
  @Input() rows: number = 1;   // Número de filas por defecto

  bestAlbums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.loadBestAlbums();
  }

  loadBestAlbums() {
    this.albumService.getBestAlbums().subscribe(
      (response: BestAlbumsResponse) => {
        this.bestAlbums = response.best_albums;
        console.log(this.bestAlbums);
      }
    );
  }


}
