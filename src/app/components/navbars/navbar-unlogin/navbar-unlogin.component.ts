import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SearchComponent } from "../../search/search.component";

@Component({
  selector: 'app-navbar-unlogin',
  standalone: true,
  imports: [RouterModule, SearchComponent],
  templateUrl: './navbar-unlogin.component.html',
  styleUrl: './navbar-unlogin.component.css'
})
export class NavbarUnloginComponent {

}
