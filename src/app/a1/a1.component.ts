import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { NgForOf } from '@angular/common';
import { SafeUrlPipe } from '../../safe-url.pipe';  // Importa el pipe

@Component({
  selector: 'app-a1',
  standalone: true,
  imports: [
    NgForOf,
    SafeUrlPipe  // Incluye el pipe en la lista de imports
  ],
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css']
})
export class VideoListComponent implements OnInit {
  videos: any[] = []; // Lista de videos
  generatedCode: string | null = null; // Código generado para un video
  selectedVideoUrl: string | null = null; // URL del video a mostrar (si el código es válido)

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Obtener la lista de videos desde el servidor
    this.socketService.getVideos((videos) => {
      this.videos = videos;
    });
  }

  selectVideo(videoId: number) {
    // Generar el código para el video seleccionado
    this.socketService.selectVideo(videoId, (code) => {
      this.generatedCode = code;
      alert(`Código generado para este video: ${code}`);
    });
  }

  validateCode(code: string) {
    // Validar el código ingresado
    this.socketService.validateCode(code, (response) => {
      if (response.valid) {
        const video = this.videos.find(v => v.id === response.videoId);
        if (video) {
          this.selectedVideoUrl = video.url; // Asignar la URL del video
          console.log('URL seleccionada:', this.selectedVideoUrl); // Verifica la URL en consola
        }
      } else {
        alert('Código inválido. Intente nuevamente.');
      }
    });
  }
}
