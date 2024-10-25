import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../common/show';

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
  
}



  