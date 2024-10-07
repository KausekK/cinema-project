import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotions } from '../common/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private baseUrl = `http://localhost:8080/api/promotions`;

  constructor(private httpClient: HttpClient) { }

  getPromotionsList(): Observable<Promotions[]> {
    return this.httpClient.get<Promotions[]>(this.baseUrl);
  }

  getPromotionById(promotionId: number): Observable<Promotions> {
    const searchUrl = `${this.baseUrl}/${promotionId}`;
    return this.httpClient.get<Promotions>(searchUrl);
  }
}
