import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-with-this-song',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-with-this-song.component.html',
  styleUrls: ['./list-with-this-song.component.css']
})
export class ListWithThisSongComponent {
  @Input() userPhoto: string = '';
  @Input() username: string = '';
  @Input() listTitle: string = '';
  @Input() songPhotos: { photo: string }[] = [];
  @Input() totalSongsCount: number = 0;
  @Input() reviewsCount: number = 0;
  @Input() likesCount: number = 0;
  @Input() rankedCount: number = 0;
  @Input() totalScore: number = 0;
  @Input() id_list: number = 0; // Agregado para recibir el id de la lista

}
