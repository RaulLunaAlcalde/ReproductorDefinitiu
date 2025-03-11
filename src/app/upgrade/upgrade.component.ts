import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class UpgradeComponent {
  message: string = '';

  constructor(private router: Router) {}

  upgradeToPremium() {
    const token = localStorage.getItem('token');

    if (token) {
      const [data, signature] = atob(token).split('.');
      if (signature === 'mi_clave_secreta') {
        let user = JSON.parse(data);
        user.isPremium = true;

        const newToken = btoa(JSON.stringify(user) + '.' + 'mi_clave_secreta');
        localStorage.setItem('token', newToken);

        this.message = '¡Ahora eres un usuario premium!';
        setTimeout(() => this.router.navigate(['/home']), 2000);
      } else {
        this.message = 'Token inválido. Inicia sesión nuevamente.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    }
  }
}
