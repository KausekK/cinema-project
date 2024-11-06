import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../common/movie';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrl: './move-details.component.css'
})
export class MoveDetailsComponent implements OnInit{

  movie: Movie[] = [];
  movieTitle: string ='';
  lang: string = '';
  private langChangeSubscription!: Subscription;

constructor(
  private moviesService: MoviesService,
  private route: ActivatedRoute,
  private translate: TranslateService

){}

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.paramMap.get('title') || '';
    this.getMovieDetails(this.movieTitle);
    this.lang = localStorage.getItem('language') || 'pl'; 

    this.langChangeSubscription = this.translate.onLangChange.subscribe((event) => {
      this.lang = event.lang; 
      this.getMovieDetails(this.movieTitle); 
    });
  }
  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  getMovieDetails(title: string){
    this.moviesService.getMovieDetails(title).subscribe(
      data=>{
        this.movie = data;
        console.log(data)
      }
    )
  }
}
