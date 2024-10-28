import { Component } from '@angular/core';
import { GridrowComponent } from "../../components/gridrow/gridrow.component";
import { WelcomeComponent } from "../../components/welcome/welcome.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [GridrowComponent, WelcomeComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
