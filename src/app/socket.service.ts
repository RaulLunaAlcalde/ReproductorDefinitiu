import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Conectar con el servidor
    this.socket = io('http://10.0.2.2:3000');
  }

  getVideos(callback: (videos: any[]) => void) {
    this.socket.emit('getVideos');
    this.socket.on('videoList', (videos) => {
      callback(videos);
    });
  }

  selectVideo(videoId: number, callback: (code: string) => void) {
    this.socket.emit('selectVideo', videoId);
    this.socket.on('generatedCode', (code) => {
      callback(code);
    });
  }

  validateCode(code: string, callback: (response: any) => void) {
    this.socket.emit('validateCode', code);
    this.socket.on('codeValid', (response) => {
      callback(response);
    });
  }
}
