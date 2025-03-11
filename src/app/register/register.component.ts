import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    RouterLink
  ],
  standalone: true
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  isPremium: boolean = false; // Nuevo campo
  message: string = '';

  constructor(private router: Router) {}

  register() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verifica si el usuario ya existe
    if (users.some((u: any) => u.email === this.email)) {
      this.message = 'Este correo ya está registrado.';
      return;
    }

    // Guarda el usuario en localStorage con el campo premium
    users.push({ email: this.email, password: this.password, isPremium: this.isPremium });
    localStorage.setItem('users', JSON.stringify(users));

    this.message = 'Registro exitoso. Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
