import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-a2',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './a2.component.html',
  styleUrl: './a2.component.css'
})
export class VideoPlayerComponent {
  code: string = '';
  validVideo: any | null = null;

  constructor(private socketService: SocketService) {}

  validateCode() {
    this.socketService.validateCode(this.code, (response) => {
      if (response.valid) {
        this.validVideo = response.videoId;
      } else {
        alert('Código inválido. Intente nuevamente.');
      }
    });
  }
}
