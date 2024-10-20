import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private movieTitleSource = new BehaviorSubject<string>('');
  movieTitle$ = this.movieTitleSource.asObservable();

  private cityNameSource = new BehaviorSubject<string>('');
  cityName$ = this.cityNameSource.asObservable();

  private showTimeSource = new BehaviorSubject<string>('');
  showTime$ = this.showTimeSource.asObservable();

  private showIdSource = new BehaviorSubject<number>(0);
  showId$ = this.showIdSource.asObservable();

  private hallNumberSource = new BehaviorSubject<number>(0);
  hallNumber$ = this.hallNumberSource.asObservable();

  private posterUrlSource = new BehaviorSubject<string>('');
  posterUrl$ = this.posterUrlSource.asObservable();

  private selectedSeatsSource = new BehaviorSubject<Map<number, number[]>>(new Map());
  selectedSeats$ = this.selectedSeatsSource.asObservable();

  private selectedDaySource = new BehaviorSubject<string>(new Date().toLocaleDateString('pl-PL', { weekday: 'long' }));
  selectedDay$ = this.selectedDaySource.asObservable();

  private selectedSeatsNumbersSource = new BehaviorSubject<number[]>([])
  selectedSeatsNumbers$ = this.selectedSeatsNumbersSource.asObservable();

  setSelectedDay(day: string) {
    this.selectedDaySource.next(day);
  }
  setMovieTitle(title: string) {
    this.movieTitleSource.next(title);
  }

  setCityName(city: string) {
    this.cityNameSource.next(city);
  }
  setPosterUrl(posterUrl: string){
    this.posterUrlSource.next(posterUrl);
  }

  setShowTime(time: string) {
    this.showTimeSource.next(time);
  }
  
  setShowId(id: number){
    this.showIdSource.next(id);
  }

  setHallNumber(hall: number) {
    this.hallNumberSource.next(hall);
  }

  setSelectedSeats(seats: Map<number, number[]>) {
    this.selectedSeatsSource.next(seats)
  }
  setSelectedSeatsNumber(seats: number[]){
    this.selectedSeatsNumbersSource.next(seats);
  }
}
