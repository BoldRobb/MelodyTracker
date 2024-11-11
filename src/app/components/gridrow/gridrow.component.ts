import { Component, Input, OnInit } from '@angular/core';
import { BestAlbumsResponse, Album } from '../../interfaces/album';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { RouterOutlet, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-gridrow',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './gridrow.component.html',
  styleUrl: './gridrow.component.css'
})

export class GridrowComponent implements OnInit {
  @Input() type: string = '';  // Tipo de elemento
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
