import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../common/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private baseUrl = `http://localhost:8080/api/tickets`;


  constructor(private httpClient: HttpClient) { }


  getTicketTypesAndPrices(dayOfWeek: string): Observable<Ticket[]> {
  return this.httpClient.get<Ticket[]>(`${this.baseUrl}/prices?dayOfWeek=${dayOfWeek}`);
}

}
