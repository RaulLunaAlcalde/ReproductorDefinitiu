import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {VideoListComponent} from './a1/a1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Reproductor';
}
