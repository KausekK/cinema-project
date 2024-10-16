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


  getShowsByCity(cityName: string, dayOfWeek: string, page: number, size: number): Observable<GetResponseShows> {
    const englishDay = this.getEnglishDayName(dayOfWeek);
    const searchUrl = `${this.baseUrl}?cityName=${cityName}&dayOfWeek=${englishDay}&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseShows>(searchUrl);
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

  
interface GetResponseShows {
  content: Show[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

  