import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true  // Marca como standalone
})
export class SpinnerComponent {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    // Suscribirse al observable para mostrar/ocultar el spinner
    this.spinnerService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
