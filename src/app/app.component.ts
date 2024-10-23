import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { GridrowComponent } from "./components/gridrow/gridrow.component";

@Component({
  selector: 'app-rooot',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, GridrowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MelodyTracker';
}
