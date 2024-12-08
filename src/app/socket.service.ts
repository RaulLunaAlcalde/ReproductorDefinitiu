import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });
  }

  getVideos(callback: (videos: any[]) => void) {
    this.socket.emit('getVideos');
    this.socket.on('videoList', callback);
  }

  selectVideo(videoId: number, callback: (code: string) => void) {
    this.socket.emit('selectVideo', videoId);
    this.socket.on('generatedCode', callback);
  }

  onPlayVideo(callback: (videoUrl: string) => void) {
    this.socket.on('playVideo', (data: { videoUrl: string }) => {
      callback(data.videoUrl);
    });
  }
}
