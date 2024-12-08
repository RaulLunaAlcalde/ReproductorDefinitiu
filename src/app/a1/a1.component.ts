import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import {NgForOf, NgIf} from '@angular/common';

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

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.getVideos((videos) => {
      this.videos = videos;
    });

    // Escoltar l'esdeveniment per reproduir el vídeo
    this.socketService.onPlayVideo((videoUrl) => {
      this.currentVideoUrl = videoUrl;
    });
  }

  generateCode(videoId: number) {
    this.socketService.selectVideo(videoId, (code) => {
      this.generatedCode = code;
      alert(`Codi generat per al vídeo ${videoId}: ${code}`);
    });
  }
}
