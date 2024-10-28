import { Component } from '@angular/core';
import { NavbarUnloginComponent } from "../../components/navbars/navbar-unlogin/navbar-unlogin.component";
import { LogindataComponent } from "./logindata/logindata.component";
import { RegisterdataComponent } from './registerdata/registerdata.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarUnloginComponent, LogindataComponent, LogindataComponent, RegisterdataComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLogin: boolean = true;

  toggleView() {
    this.showLogin = !this.showLogin; // Cambia entre login y register
  }
}
