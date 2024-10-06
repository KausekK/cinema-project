import { Component, OnInit } from '@angular/core';
import { Movie } from '../../common/movie';
import { MoviesService } from '../../services/movies.service';
import { CitiesService } from '../../services/cities.service';
import { ShowsService } from '../../services/shows.service';
import { Show } from '../../common/show';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css'
})
export class RepertoireComponent implements OnInit{

  weekDays: string[] = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd'];
  today: string;
  rotatedWeekDays: string[];
  selectedCity: string ='';

  dayName: string = '';
  selectedDay: string= '';
  cities: string[]=[]
  movies: Movie[] = [];
  shows: Show[]=[];

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElement: number = 0;
  groupedMovies: { movie: Movie; times: string[]; }[] | undefined;

  constructor(private movieService: MoviesService,
    private citiesService: CitiesService,
    private showsService: ShowsService
  ) {
    const now = new Date();
    const todayIndex = this.getAdjustedDayIndex(now.getDay());
    this.today = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });

    this.rotatedWeekDays = this.getRotatedWeekDays(todayIndex);

    this.rotatedWeekDays[0] = 'Dziś';
  }
  ngOnInit(): void {
    // this.listMovies();
    this.listCities();
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

listCities(){
  this.citiesService.getCitiesList().subscribe(
    data=>{
      this.cities = data;
  })
}

listMoviesWithCityParam(city: string) {
  this.showsService.getShowsByCity(city, this.pageNumber - 1, this.pageSize).subscribe(
    data => {
      if (data && data.content) {
        const groupedShows = new Map<number, { movie: Movie, times: string[] }>();

        data.content.forEach((show: Show) => {
          if (!groupedShows.has(show.movie.id)) {
            groupedShows.set(show.movie.id, { movie: show.movie, times: [show.showTime] });
          } else {
            groupedShows.get(show.movie.id)!.times.push(show.showTime);
          }
        });

        this.groupedMovies = Array.from(groupedShows.values());
        console.log(this.groupedMovies)
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElement = data.page.totalElements;
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




}
