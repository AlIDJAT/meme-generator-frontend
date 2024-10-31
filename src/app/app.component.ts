import { Component, ViewChild } from '@angular/core';
import { MemeGeneratorComponent } from './components/meme-generator/meme-generator.component';
import { MemeGalleryComponent } from './components/meme-gallery/meme-gallery.component';
import { Meme } from './services/meme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MemeGeneratorComponent,
    MemeGalleryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MemeGalleryComponent) gallery!: MemeGalleryComponent;

  onMemeCreated(newMeme: Meme): void {
    this.gallery.addMeme(newMeme);
  }
}
