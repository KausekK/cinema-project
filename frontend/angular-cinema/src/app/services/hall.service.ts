import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hall } from '../common/hall';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  private baseUrl = `http://localhost:8080/api/hall`;


  constructor(private httpClient: HttpClient) { }

  public getHallForSpecificShow(cityName: string, title: string, showTime: string): Observable<Hall[]>{
    return this.httpClient.get<Hall[]>(`${this.baseUrl}?cityName=${cityName}&movieTitle=${title}&showTime=${showTime}`)
    
  }}
