import { Component, OnInit } from '@angular/core';
import { Movie } from '../../common/movie';
import { MoviesService } from '../../services/movies.service';
import { CitiesService } from '../../services/cities.service';
import { ShowsService } from '../../services/shows.service';
import { Show } from '../../common/show';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../../services/shared/data.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css'
})
export class RepertoireComponent implements OnInit{

  movieType: string = '';
  weekDays: string[] = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd'];
  today: string;
  rotatedWeekDays: string[];
  selectedCity: string ='';

  dayName: string = '';
  selectedDay: string= '';
  cities: string[]=[]
  movies: Movie[] = [];
  shows: Show[]=[];

  showId: number = 0;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElement: number = 0;
  groupedMovies: { movie: Movie; times: string[]; showIds: number[] }[] | undefined;
  isTrailerOpen: boolean = false;

  constructor(private movieService: MoviesService,
    private citiesService: CitiesService,
    private showsService: ShowsService,
    private router: Router,
    private dataService: DataService

  ) {
    const now = new Date();
    const todayIndex = this.getAdjustedDayIndex(now.getDay());
    this.today = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });

    this.rotatedWeekDays = this.getRotatedWeekDays(todayIndex);

    this.rotatedWeekDays[0] = 'Dziś';
  }
  ngOnInit(): void {
    this.listCities();
    this.selectedDay = this.weekDays[this.getAdjustedDayIndex(new Date().getDay())];

    this.dataService.selectedDay$.subscribe(day => {
      this.selectedDay = day;
    });
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
    this.dataService.setSelectedDay(day);
    if (this.selectedCity) {
      this.listMoviesWithCityParam(this.selectedCity, this.selectedDay);
    }
  }
  

listMovies(){
  this.movieService.getMoviesList().subscribe(
    data =>{
      this.movies = data;
    }
  )
}

listCities(){
  this.citiesService.getCitiesList().subscribe(
    data=>{
      this.cities = data;
  })
}

listMoviesWithCityParam(city: string, dayOfWeek: string) {
  if (dayOfWeek === 'Dziś') {
    dayOfWeek = this.weekDays[this.getAdjustedDayIndex(new Date().getDay())];
  }

  this.showsService.getShowsByCity(city, dayOfWeek).subscribe(
    data => {
      if (data) {
        const groupedShows = new Map<number, { movie: Movie, times: string[], showIds: number[] }>();

        data.forEach((show: Show) => {
          if (!groupedShows.has(show.movie.id)) {
            groupedShows.set(show.movie.id, { movie: show.movie, times: [show.showTime], showIds: [show.id] });
          } else {
            groupedShows.get(show.movie.id)!.times.push(show.showTime);
          }
        });

        this.groupedMovies = Array.from(groupedShows.values());
        console.log(this.groupedMovies);

      } else {
        console.error("Nie znaleziono odpowiedniej struktury danych w odpowiedzi: ", data);
        this.groupedMovies = [];
      }
    },
    error => {
      console.error("Błąd podczas pobierania seansów: ", error);
    }
  );
}


navigateToLogin() {
  this.router.navigate(['/cinema-room']);
}

navigateToSeatsSelection(showId: number, title: string, city: string, time: string): void {
  this.router.navigate(['/cinema-room'], {
    queryParams: {
      id: showId,
      movieTitle: title,
      cityName: city,
      showTime: time
    }
  });
}


}
