import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {VideoListComponent} from './a1/a1.component';
import {VideoPlayerComponent} from './a2/a2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoListComponent, VideoPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Reproductor';
}
