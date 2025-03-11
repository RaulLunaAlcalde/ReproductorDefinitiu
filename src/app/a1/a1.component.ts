import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css'],
  imports: [
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  generatedCode: string | null = null;
  currentVideoUrl: string | null = null;
  user: any = null;
  private secretKey = 'mi_clave_secreta'; // 🔑 Clave secreta para verificar el token

  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    if (this.validateToken()) {
      this.loadUserFromToken();

      this.socketService.getVideos((videos) => {
        this.videos = videos;
      });

      this.socketService.onPlayVideo((videoUrl) => {
        this.currentVideoUrl = videoUrl;
      });
    } else {
      alert('Sesión expirada o token inválido. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
    }
  }

  generateCode(videoId: number) {
    if (this.validateToken()) {
      this.socketService.selectVideo(videoId, (code) => {
        this.generatedCode = code;
        alert(`Código generado para el video ${videoId}: ${code}`);
      });
    } else {
      alert('El token ha sido modificado o es inválido. Cerrando sesión...');
      this.logout(); // Cerrar sesión si el token es inválido
    }
  }

  loadUserFromToken() {
    const token = localStorage.getItem('token');

    if (token) {
      const [data, signature] = atob(token).split('.');
      if (signature === this.secretKey) {
        this.user = JSON.parse(data);
      }
    }
  }

  validateToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const [data, signature] = atob(token).split('.');
      if (signature !== this.secretKey) return false; // ❌ Token manipulado

      const tokenData = JSON.parse(data);
      if (Date.now() > tokenData.exp) return false; // ❌ Token caducado

      return true; // ✅ Token válido
    } catch (error) {
      return false; // ❌ Token corrupto
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
