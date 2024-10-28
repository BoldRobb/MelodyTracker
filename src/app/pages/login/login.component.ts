import { Component } from '@angular/core';
import { NavbarUnloginComponent } from "../../components/navbars/navbar-unlogin/navbar-unlogin.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarUnloginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
