import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-gridrow',
  standalone: true,
  imports: [],
  templateUrl: './gridrow.component.html',
  styleUrl: './gridrow.component.css'
})
export class GridrowComponent {
  @Input() columns: number = 8; // Número de columnas por defecto
  @Input() rows: number = 1;    // Número de filas por defecto
}

