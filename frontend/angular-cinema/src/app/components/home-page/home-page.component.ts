import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../common/movie';
import { MoviesPosters } from '../../common/movies-posters';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  currentTrailerUrl: string ="mqqft2x_Aa4";
  public movies: MoviesPosters[] =[]; 

  constructor(private moviesService: MoviesService){
  }

  ngOnInit(): void {
    this.getMoviesPosters();
  }

  previousTrailer(){
    this.currentTrailerUrl="LdOM0x0XDMo"
  }

  nextTrailer(){
    this.currentTrailerUrl="t433PEQGErc"
  }

  getMoviesPosters(){
    this.moviesService.getMoviesPostersUrl().subscribe(
      data =>{
        this.movies = data;
      }
    )
  }
}
