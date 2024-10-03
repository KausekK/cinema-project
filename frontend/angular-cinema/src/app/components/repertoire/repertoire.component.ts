import { Component } from '@angular/core';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css'
})
export class RepertoireComponent {

  weekDays: string[] = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd'];
  today: string;
  rotatedWeekDays: string[];

  dayName: string = '';
  selectedDay: string= '';
  constructor() {
    const now = new Date();
    const todayIndex = this.getAdjustedDayIndex(now.getDay());
    this.today = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Obrót dni tygodnia, zaczynając od dzisiaj
    this.rotatedWeekDays = this.getRotatedWeekDays(todayIndex);

    // Zamień pierwszy dzień na "Dziś"
    this.rotatedWeekDays[0] = 'Dziś';
  }

  // Metoda do rotacji tablicy dni tygodnia
  getRotatedWeekDays(todayIndex: number): string[] {
    const rotated = [...this.weekDays.slice(todayIndex), ...this.weekDays.slice(0, todayIndex)];
    return rotated;
  }

  getAdjustedDayIndex(dayIndex: number): number {
    // Jeśli "getDay()" zwraca 0 (niedziela), musimy przesunąć ją na koniec tablicy
    if (dayIndex === 0) {
      return 6; // Niedziela
    } else {
      return dayIndex - 1; // Zmiana pozostałych dni o -1, aby pasowało do tablicy ['Pn', 'Wt', ...]
    }
  }
  selectDay(day: string) {
    this.selectedDay = day;
    // Zaktualizuj filmy w zależności od wybranego dnia
}

}
