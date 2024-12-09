import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/others/spinner.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ListsService } from '../../services/lists/backend/lists.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lists-of-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lists-of-user.component.html',
  styleUrls: ['./lists-of-user.component.css']
})
export class ListsOfUserComponent implements OnInit {
  id_user: number = 0;
  userLists: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_user = +params.get('id')!;
      this.getUserLists();
    });
  }

  getUserLists(): void {
    this.spinnerService.show();

    this.listsService.getInfoUserLists(this.id_user).pipe(
      finalize(() => this.spinnerService.hide())
    ).subscribe((data: any[]) => {
      this.userLists = data;
    });
  }

  // Función para redondear el puntaje de estrellas
  getRoundedStars(score: number): number[] {
    let fullStars = Math.floor(score); // Estrellas completas
    let halfStar = 0;
  
    // Redondeo basado en los puntos decimales
    if (score % 1 >= 0.80) {
      // Redondear hacia arriba a 1 (estrella completa)
      fullStars += 1;
    } else if (score % 1 >= 0.30) {
      // Redondear a 0.5 (media estrella)
      halfStar = 1;
    }
  
    const stars = [];
  
    // Agregar las estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push(1); // Estrella completa
    }
  
    // Agregar la media estrella si corresponde
    if (halfStar) {
      stars.push(0.5); // Media estrella
    }
  
    return stars;
  }
}
