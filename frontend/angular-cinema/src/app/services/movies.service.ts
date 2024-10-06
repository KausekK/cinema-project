import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../common/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = `http://localhost:8080/api/movies`;

  constructor(private httpClient: HttpClient) { }

  getMoviesList(): Observable<Movie[]> {
    return this.httpClient.get<GetResponseMovies>(this.baseUrl).pipe(
      map(response => response._embedded.movies)
    );
}

}

interface GetResponseMovies{
  _embedded:{
    movies: Movie[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
