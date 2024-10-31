import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meme {
  id?: number;
  imageUrl: string;
  topText: string;
  bottomText: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  private apiUrl = 'http://localhost:8080/api/memes';

  constructor(private http: HttpClient) { }

  uploadImage(file: File, topText: string, bottomText: string): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('topText', topText);
    formData.append('bottomText', bottomText);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload`, formData);
  }
  

  createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>(this.apiUrl, meme);
  }

  getAllMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.apiUrl);
  }
}
