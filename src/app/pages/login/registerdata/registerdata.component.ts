import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { UsersService } from '../../../services/users/backend/users.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Validador personalizado para verificar que las contraseñas coinciden
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  };
}

@Component({
  selector: 'app-registerdata',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registerdata.component.html',
  styleUrls: ['./registerdata.component.css']
})
export class RegisterdataComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['user'] // Asignamos el valor por defecto "user"
    }, { validators: passwordMatchValidator() }); // Aplicamos el validador personalizado
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword, // Incluyendo confirmPassword
        role: 'user' // Asignamos el rol "user"
      };
      
      this.usersService.registerUser(formData).subscribe(
        (response) => {
          console.log(response);
          alert('User registered successfully');
        },
        (error) => {
          console.error(error);
          alert('Error registering user: ' + (error.error.detail || error.message || 'Unknown error'));
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
