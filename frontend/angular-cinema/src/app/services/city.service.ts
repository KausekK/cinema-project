import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl = `http://localhost:8080/api/city`;

  constructor(private httpClient: HttpClient) { }

  getCitiesList(): Observable<string[]> {
    return this.httpClient.get<City[]>(this.baseUrl + "/all").pipe(
      map((response: City[]) => response.map(city => city.cityName))
    );
  }

  getCityIdByName(cityName: string): Observable<number> {
    const params = new HttpParams().set('cityName', cityName);
    return this.httpClient.get<number>(this.baseUrl + "/id", { params });
  }
  
}

interface City {
  id: number;
  cityName: string;
}
