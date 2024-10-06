import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private baseUrl = `http://localhost:8080/api/cities`;

  constructor(private httpClient: HttpClient) { }

  getCitiesList(): Observable<string[]> {
    return this.httpClient.get<GetResponseCities>(this.baseUrl).pipe(
      map(response => response._embedded.cities.map(city => city.cityName))
    );
  }
}

interface GetResponseCities {
  _embedded: {
    cities: Array<{
      cityName: string;
    }>;
  };
}
