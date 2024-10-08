import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../common/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrl: './move-details.component.css'
})
export class MoveDetailsComponent implements OnInit{

  movie: Movie[] = [];
  movieTitle: string ='';

constructor(
  private moviesService: MoviesService,
  private route: ActivatedRoute
){}

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.paramMap.get('title') || '';
    this.getMovieDetails(this.movieTitle);
  }


  getMovieDetails(title: string){
    this.moviesService.getMovieDetails(title).subscribe(
      data=>{
        this.movie = data;
      }
    )
  }
}
