import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    RouterLink
  ],
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  private secretKey = 'mi_clave_secreta';

  constructor(private router: Router) {}

  login() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      this.message = user.isPremium ? 'Inicio de sesión exitoso (Premium)' : 'Inicio de sesión exitoso';


      const tokenData = {
        email: user.email,
        isPremium: user.isPremium,
        exp: Date.now() + 15 * 60 * 1000
      };

      const token = btoa(JSON.stringify(tokenData) + '.' + this.secretKey);

      localStorage.setItem('token', token);

      this.router.navigate(['/home']);
    } else {
      this.message = 'Correo o contraseña incorrectos';
    }
  }
}
