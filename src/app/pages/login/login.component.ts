import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarUnloginComponent } from "../../components/navbars/navbar-unlogin/navbar-unlogin.component";
import { LogindataComponent } from "./logindata/logindata.component";
import { RegisterdataComponent } from './registerdata/registerdata.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarUnloginComponent, LogindataComponent, RegisterdataComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogin: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verifica si existe el token en el localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      // Redirige a /homepage si el token existe
      this.router.navigate(['/homepage']);
    }
  }

  toggleView() {
    this.showLogin = !this.showLogin; // Cambia entre login y register
  }
}
