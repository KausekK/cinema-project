import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../common/movie';
import { MoviesPosters } from '../common/movies-posters';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = `http://localhost:8080/api/movies`;
  
  constructor(private httpClient: HttpClient) { }

  getMoviesList(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.baseUrl);
}

getMoviesPostersUrl(): Observable<MoviesPosters[]>{
  return this.httpClient.get<MoviesPosters[]>(this.baseUrl + `/posters`)
}

getMovieDetails(title: string): Observable<Movie[]>{
  return this.httpClient.get<Movie[]>(`${this.baseUrl}/details?title=${title}`)
}

}

