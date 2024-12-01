import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-total',
  standalone: true,
  imports: [],
  templateUrl: './stat-total.component.html',
  styleUrls: ['./stat-total.component.css']
})
export class StatTotalComponent {
  @Input() type_stat: string = 'list'; // Tipo de estadística
  @Input() total: number = 0;         // Total para la estadística
}
