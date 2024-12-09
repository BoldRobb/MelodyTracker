import { Component, OnInit } from '@angular/core';
import { ListWithThisSongComponent } from "../list-with-this-song/list-with-this-song.component";
import { ListsService } from '../../services/lists/backend/lists.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-lists',
  standalone: true,
  imports: [ListWithThisSongComponent, CommonModule],
  templateUrl: './popular-lists.component.html',
  styleUrls: ['./popular-lists.component.css']
})
export class PopularListsComponent implements OnInit {
  listsData: any[] = []; // Almacena las listas populares
  loading: boolean = true; // Maneja el estado de carga

  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    this.fetchTop4PopularLists(); // Cargar datos al iniciar
  }

  fetchTop4PopularLists(): void {
    this.listsService.getTop4PopularLists().subscribe(
      (response) => {
        this.listsData = response.top_4_lists || []; // Manejar datos recibidos
        this.loading = false; // Finalizar estado de carga
      },
      (error) => {
        console.error('Error fetching top 4 popular lists:', error);
        this.loading = false; // Finalizar estado de carga incluso en error
      }
    );
  }
}
