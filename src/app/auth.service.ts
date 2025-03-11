import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  register(user: { email: string; password: string }) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar si el usuario ya existe
    if (users.some((u: any) => u.email === user.email)) {
      return { success: false, message: 'El usuario ya está registrado' };
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Registro exitoso' };
  }

  login(email: string, password: string) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, message: 'Inicio de sesión exitoso' };
    }

    return { success: false, message: 'Credenciales incorrectas' };
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}

