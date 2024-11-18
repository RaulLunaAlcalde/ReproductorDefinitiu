import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-a1',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css']
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  generatedCode: string | null = null;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.getVideos((videos) => {
      this.videos = videos;
    });
  }

  selectVideo(videoId: number) {
    this.socketService.selectVideo(videoId, (code) => {
      this.generatedCode = code;
      alert(`El código para el video ${videoId} es: ${code}`);
    });
  }
}
