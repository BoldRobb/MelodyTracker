import { Component } from '@angular/core';
import { GridrowComponent } from "../../components/gridrow/gridrow.component";
import { WelcomeComponent } from "../../components/welcome/welcome.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [GridrowComponent, WelcomeComponent, SpinnerComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  // Lógica del componente
} 
