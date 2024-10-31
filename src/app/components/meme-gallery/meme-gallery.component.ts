import { Component, OnInit } from '@angular/core';
import { MemeService, Meme } from '../../services/meme.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-meme-gallery',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './meme-gallery.component.html',
  styleUrls: ['./meme-gallery.component.scss'],
})
export class MemeGalleryComponent implements OnInit {
  memes: Meme[] = [];
  paginatedMemes: Meme[] = [];
  pageSize = 6;
  currentPage = 0;

  constructor(private memeService: MemeService) {}

  ngOnInit(): void {
    this.memeService.getAllMemes().subscribe(data => {
      this.memes = data;
      this.updatePaginatedMemes();
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedMemes();
  }

  updatePaginatedMemes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMemes = this.memes.slice(startIndex, endIndex);
  }

  addMeme(meme: Meme): void {
    this.memes.unshift(meme);
    this.updatePaginatedMemes(); // Actualise la pagination pour inclure le nouveau mème
  }
  
}
