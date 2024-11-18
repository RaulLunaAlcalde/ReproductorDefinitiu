import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Dirección del servidor
  }

  getVideos(callback: (videos: any[]) => void) {
    this.socket.emit('getVideos');
    this.socket.on('videoList', callback);
  }

  selectVideo(videoId: number, callback: (code: string) => void) {
    this.socket.emit('selectVideo', videoId);
    this.socket.on('generatedCode', callback);
  }

  validateCode(code: string, callback: (response: any) => void) {
    this.socket.emit('validateCode', code);
    this.socket.on('codeValid', callback);
  }
}
