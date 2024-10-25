import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UpcomingMovies } from '../common/upcoming-movies';

@Injectable({
  providedIn: 'root'
})
export class UpcomingMoviesService {


  constructor(private httpClient: HttpClient) { }

  getUpcomingMovies(page: number, size: number): Observable<GetResponseUpcomingMovies>{
    return this.httpClient.get<GetResponseUpcomingMovies>(`${environment.apiUrl}/upcoming-movies?page=${page}&size=${size}`);
  }

}

interface GetResponseUpcomingMovies{
  _embedded:{
    upcomingMovies: UpcomingMovies[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }

}
