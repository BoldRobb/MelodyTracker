import { Component } from '@angular/core';
import { WelcomeComponent } from "../../welcome/welcome.component";

@Component({
  selector: 'app-homepage-login',
  standalone: true,
  imports: [WelcomeComponent],
  templateUrl: './homepage-login.component.html',
  styleUrl: './homepage-login.component.css'
})
export class HomepageLoginComponent {

}
