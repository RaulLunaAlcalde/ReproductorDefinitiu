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
    ]
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  generatedCode: string | null = null;
  currentVideoUrl: string | null = null;
  user: any = null;
  private secretKey = 'mi_clave_secreta';

  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    if (this.validateToken()) {
      this.loadUserFromToken();

      this.socketService.getVideos((videos) => {

        if (!this.user.isPremium) {
          this.videos = videos.filter(video => !video.premiumOnly);
        } else {
          this.videos = videos;
        }
      });

      this.socketService.onPlayVideo((videoUrl) => {
        this.currentVideoUrl = videoUrl;
      });
    } else {
      alert('Sesión expirada o token inválido. Inicia sesión nuevamente.');
      this.logout();
    }
  }

  generateCode(videoId: number) {
    if (this.validateToken()) {
      if (!this.user.isPremium) {
        alert('Solo los usuarios Premium pueden generar un código de video.');
        return;
      }

      this.socketService.selectVideo(videoId, (code) => {
        this.generatedCode = code;
        alert(`Código generado para el video ${videoId}: ${code}`);
      });
    } else {
      alert('El token ha sido modificado o es inválido. Cerrando sesión...');
      this.logout();
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
      if (signature !== this.secretKey) return false;

      const tokenData = JSON.parse(data);
      if (Date.now() > tokenData.exp) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  upgrade() {
    this.router.navigate(['/upgrade']);
  }

}
