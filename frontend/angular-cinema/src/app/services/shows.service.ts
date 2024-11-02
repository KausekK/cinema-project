import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Show } from '../common/show';
import { AddShowClass } from '../common/add-show';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {


  private baseUrl = `http://localhost:8080/api/shows`;

  constructor(private httpClient: HttpClient) { }


  getShowsByCity(cityName: string, dayOfWeek: string): Observable<Show[]> {
    const englishDay = this.getEnglishDayName(dayOfWeek);
    const searchUrl = `${this.baseUrl}?cityName=${cityName}&dayOfWeek=${englishDay}`;
    return this.httpClient.get<Show[]>(searchUrl);
  }

  getShowsByCityTitleAndDate(cityName: string, title: string, showDate: string): Observable<Show[]> {
    const searchUrl = `${this.baseUrl}/date?cityName=${cityName}&title=${title}&showDate=${showDate}`;
    return this.httpClient.get<Show[]>(searchUrl);
  }

  deleteShow(id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.httpClient.delete<void>(url, {});
  }
  
  addShow(show: AddShowClass): Observable<string> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.httpClient.post<string>(this.baseUrl+"/addShow", show, { headers }).pipe(
        catchError(this.handleError)
    );
}

  getEnglishDayName(dayOfWeek: string): string {
    switch (dayOfWeek) {
      case "Pn":
        return "Monday";
      case "Wt":
        return "Tuesday";
      case "Śr":
        return "Wednesday";
      case "Czw":
        return "Thursday";
      case "Pt":
        return "Friday";
      case "So":
        return "Saturday";
      case "Nd":
        return "Sunday";
      default:
        return ""; 
    }
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
}
}

interface ShowRequest {
  movieId: number;
  showTime: string;
  cityId: number;
  hallId: number;
  dayOfWeek: string;
}


  