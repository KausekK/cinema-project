import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from '../../services/movies.service';
import { MoviesPosters } from '../../common/movies-posters';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public movies: MoviesPosters[] = [];
  
  trailers: string[] = [
    'https://www.youtube.com/embed/t433PEQGErc?autoplay=1&mute=1&loop=1&playlist=t433PEQGErc&controls=0&showinfo=0&modestbranding=1',
    'https://www.youtube.com/embed/LdOM0x0XDMo?autoplay=1&mute=1&loop=1&playlist=LdOM0x0XDMo&controls=0&showinfo=0&modestbranding=1',
    'https://www.youtube.com/embed/mqqft2x_Aa4?autoplay=1&mute=1&loop=1&playlist=mqqft2x_Aa4&controls=0&showinfo=0&modestbranding=1',
    'https://www.youtube.com/embed/je0aAf2f8XQ?autoplay=1&mute=1&loop=1&playlist=je0aAf2f8XQ&controls=0&showinfo=0&modestbranding=1',

  ];

  currentTrailerIndex: number = 0;
  
  constructor(private moviesService: MoviesService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMoviesPosters();

  }

  getSafeTrailerUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentTrailerUrl);
  }

  get currentTrailerUrl(): string {
    return this.trailers[this.currentTrailerIndex];
  }

  previousTrailer(): void {
    this.currentTrailerIndex = (this.currentTrailerIndex - 1 + this.trailers.length) % this.trailers.length;
  }

  nextTrailer(): void {
    this.currentTrailerIndex = (this.currentTrailerIndex + 1) % this.trailers.length;
  }

  getMoviesPosters() {
    this.moviesService.getMoviesPostersUrl().subscribe(
      data => {
        this.movies = data;
      }
    );
  }
  
}
