import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService, BestAlbumsResponse, Album } from './services/album-service.service';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { GridrowComponent } from "./components/gridrow/gridrow.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, GridrowComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MelodyTracker';
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
      },
      (error) => {
        console.error('Error al obtener los mejores álbumes:', error);
      }
    );
  }
}
