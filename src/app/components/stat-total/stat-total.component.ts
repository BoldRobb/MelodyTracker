import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-total',
  standalone: true,
  imports: [],
  templateUrl: './stat-total.component.html',
  styleUrl: './stat-total.component.css'
})
export class StatTotalComponent {
  @Input() type_stat: string = 'heart';
}
