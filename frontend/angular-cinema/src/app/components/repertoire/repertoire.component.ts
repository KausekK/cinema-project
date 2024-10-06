import { Component, OnInit } from '@angular/core';
import { Movie } from '../../common/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css'
})
export class RepertoireComponent implements OnInit{

  weekDays: string[] = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd'];
  today: string;
  rotatedWeekDays: string[];

  dayName: string = '';
  selectedDay: string= '';

  movies: Movie[] = [];
  constructor(private movieService: MoviesService) {
    const now = new Date();
    const todayIndex = this.getAdjustedDayIndex(now.getDay());
    this.today = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });

    this.rotatedWeekDays = this.getRotatedWeekDays(todayIndex);

    this.rotatedWeekDays[0] = 'Dziś';
  }
  ngOnInit(): void {
    this.listMovies();
  }

  getRotatedWeekDays(todayIndex: number): string[] {
    const rotated = [...this.weekDays.slice(todayIndex), ...this.weekDays.slice(0, todayIndex)];
    return rotated;
  }

  getAdjustedDayIndex(dayIndex: number): number {
    if (dayIndex === 0) {
      return 6; 
    } else {
      return dayIndex - 1; 
    }
  }
  selectDay(day: string) {
    this.selectedDay = day;
}

listMovies(){
  this.movieService.getMoviesList().subscribe(
    data =>{
      this.movies = data;
    }
  )
}

}
