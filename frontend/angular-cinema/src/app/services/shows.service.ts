import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Show } from '../common/show';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {


  private baseUrl = `http://localhost:8080/api/shows`;

  constructor(private httpClient: HttpClient) { }


  getShowsByCity(cityName: string, page:number, size: number): Observable<GetResponseShows> {
    const searchUrl = this.baseUrl+`?cityName=${cityName}&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseShows>(searchUrl)
  }
}

  
interface GetResponseShows {
  content: Show[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

  