import { Component, EventEmitter, Output } from '@angular/core';
import { MemeService, Meme } from '../../services/meme.service';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-meme-generator',
  standalone: true,
  imports: [
    CommonModule, // Pour ngIf, ngFor, etc.
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss'],
})
export class MemeGeneratorComponent {
  @Output() memeCreated = new EventEmitter<Meme>();
  
  selectedFile: File | null = null;
  imageUrl: string = '';
  topText: string = '';
  bottomText: string = '';

  constructor(private memeService: MemeService) {}

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile as Blob);
    }
  }

  createMeme(): void {
    if (this.selectedFile) {
      this.memeService.uploadImage(this.selectedFile, this.topText, this.bottomText).subscribe(response => {
        const meme: Meme = {
          imageUrl: response.imageUrl,
          topText: this.topText,
          bottomText: this.bottomText
        };
        this.memeService.createMeme(meme).subscribe(createdMeme => {
          // Émettre l'événement avec le mème nouvellement créé
          this.memeCreated.emit(createdMeme);
        });
      });
    }
  }
  
  downloadMeme(): void {
    const memeElement = document.getElementById('meme-preview') as HTMLElement;
    html2canvas(memeElement).then(canvas => {
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, 'meme.png');
        }
      });
    });
  }
}
