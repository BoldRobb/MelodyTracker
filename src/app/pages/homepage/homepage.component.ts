import { Component } from '@angular/core';
import { GridrowComponent } from "../../components/gridrow/gridrow.component";
import { WelcomeComponent } from "../../components/welcome/welcome.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { AddToListComponent } from "../../components/modals/add-to-list/add-to-list.component";
import { NewSongsComponent } from "../../components/new-songs/new-songs.component";
import { NewAlbumsComponent } from "../../components/new-albums/new-albums.component";
import { BestUsersComponent } from "../best-users/best-users.component";  // Asegúrate de que la ruta sea correcta
import { RouterModule } from '@angular/router';
import { PopularListsComponent } from "../../components/popular-lists/popular-lists.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [GridrowComponent, WelcomeComponent, SpinnerComponent, AddToListComponent, NewSongsComponent, NewAlbumsComponent, BestUsersComponent, RouterModule, PopularListsComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  // Lógica del componente
} 
