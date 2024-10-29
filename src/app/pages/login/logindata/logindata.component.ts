import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-logindata',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './logindata.component.html',
  styleUrls: ['./logindata.component.css']
})
export class LogindataComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { // Inyecta Router
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.usersService.login(username, password).subscribe(
        (token) => {
          console.log('Login successful');
          alert('Login successful');
          // Redirigir al usuario a otro componente (por ejemplo, el dashboard)
          this.router.navigate(['/homepage']); // Cambia '/dashboard' por la ruta deseada
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed: ' + (error.error.detail || error.message || 'Unknown error'));
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
