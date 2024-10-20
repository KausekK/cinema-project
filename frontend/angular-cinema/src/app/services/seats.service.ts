import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seat } from '../common/Seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  private baseUrl = `http://localhost:8080/api/seats`;


  constructor(private httpClient: HttpClient) { }

  public getTakenSeats(cityName: string, title: string, showTime: string): Observable<Seat[]>{
    return this.httpClient.get<Seat[]>(`${this.baseUrl}/available?cityName=${cityName}&movieTitle=${title}&showTime=${showTime}`)
  }

  addAvailableSeats(showId: number, seatNumbers: number[]): Observable<any> {
    const params = new HttpParams()
      .set('showId', showId.toString())
      .set('seatNumbers', seatNumbers.map(num => num.toString()).join(',')); 

    return this.httpClient.put(`${this.baseUrl}/add-seats`, {}, { params });
  }

}
