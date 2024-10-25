import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { GridrowComponent } from "./components/gridrow/gridrow.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, GridrowComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MelodyTracker';
}



