import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../common/movie';
import { ShowsService } from '../../../services/shows.service';
import { Show } from '../../../common/show';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HallService } from '../../../services/hall.service';
import { Hall } from '../../../common/hall';
import { AddShowClass } from '../../../common/add-show';
import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-show-management',
  templateUrl: './show-management.component.html',
  styleUrl: './show-management.component.css'
})
export class ShowManagementComponent implements OnInit{

  cities: string[]=[]
  selectedCity: string = '';
  movies: Movie[] = [];
  selectedMovieTitle: string = '';
  selectedTime: string = '';
  shows: Show[]=[];
  selectedDate: string = '';
  searchClicked = false; 
  halls: Hall [] = [];
  selectedHall: number = 0;
  addShow: AddShowClass [] = [];
  moreFilters: boolean = false;
  selectedMovieId: number = 0;
  showAddShowForm: boolean = false;

  constructor(private cityService: CityService,
    private movieService: MoviesService,
    private showService: ShowsService,
    private hallService: HallService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.listCities();
    this.listMovies();
    this.getHall();
  }

  toggleAddShowForm() {
    this.showAddShowForm = !this.showAddShowForm;
  }
  
  listCities(){
    this.cityService.getCitiesList().subscribe(
      data => {
        this.cities = data;
    })
  }

  selectCity(city: string){
    this.selectedCity = city
  }

  listMovies(){
    this.movieService.getMoviesList().subscribe(
      data =>{
        this.movies = data;
      }
    )
  }

  setSelectedMovieId(movieId: number) {
    this.selectedMovieId = movieId;
  }

  selectMovie(movie: Movie){
    this.selectedMovieTitle = movie.title;
    this.selectedMovieId = movie.id;
  }

  formatSelectedDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  formatTimeToHHMMSS(time: Date): string {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
  
  onTimeChange(time: Date) {
    this.selectedTime = this.formatTimeToHHMMSS(time);
  }
  

  onDateChange(date: Date) {
    this.selectedDate = this.formatSelectedDate(date);
  }

  getShowsWithFilters(){
    this.showService.getShowsByCityTitleAndDate(this.selectedCity, this.selectedMovieTitle, this.selectedDate).subscribe(
      data =>{
        this.shows = data;
      }
    )
  }
  onSearch() {
    this.searchClicked = true;
    if (this.selectedCity && this.selectedMovieTitle && this.selectedDate) {
      this.getShowsWithFilters();
  }
}

deleteShow(showId: number){
    this.showService.deleteShow(showId).subscribe({
      next: () => {
        this.showSnackbar('Seans usunięty.');
        this.getShowsWithFilters();
      },
      error: (error) => {
        this.showSnackbar('Wystąpił błąd przy usuwaniu seansu.');
      }      
      });
}

showSnackbar(message: string) {
  this.snackBar.open(message, 'Zamknij', {
    duration: 3000, 
    verticalPosition: 'top', 
    horizontalPosition: 'center' 
  });
}
showMoreFiltersToAddShow(){
  this.moreFilters = true;
}


getHall(){
  this.hallService.getHalls().subscribe(
    data=>{
        this.halls = data;
    })
}

selectHall(id: number){
  this.selectedHall = id;
}

chooseCinemaRoomForShow() {
  if (this.selectedCity && this.selectedMovieTitle && this.selectedDate && this.selectedTime && this.selectedHall) {
      this.cityService.getCityIdByName(this.selectedCity).subscribe({
          next: (cityId: number) => {
              const showTime = `${this.selectedDate} ${this.selectedTime}`;
              const selectedMovie = this.movies.find(movie => movie.title === this.selectedMovieTitle);
              const movieId = selectedMovie?.id || 0;
              const movieDuration = selectedMovie?.duration || 0;

              const newShow = new AddShowClass( 
                  movieId,
                  showTime,
                  cityId,
                  this.selectedHall,
                  this.getEnglishDayName(this.selectedDate),
                  movieDuration
              );

              this.showService.addShow(newShow).subscribe({
                  next: response => {
                      console.log('Seans dodany:', response);
                      this.showSnackbar('Seans dodany pomyślnie.');
                      this.getShowsWithFilters();
                  },
                  error: error => {
                      console.error('Błąd przy dodawaniu seansu:', error);
                      if (error.status === 409) {
                          this.showSnackbar('Seans koliduje z istniejącymi seansami.');
                      } else {
                          this.showSnackbar('Wystąpił błąd przy dodawaniu seansu.');
                      }
                  }
              });
          },
          error: error => {
              console.error('Błąd przy pobieraniu ID miasta:', error);
              this.showSnackbar('Wystąpił błąd przy pobieraniu ID miasta.');
          }
      });
  } else {
      this.showSnackbar('Uzupełnij wszystkie pola.');
  }
}


getEnglishDayName(dateString: string): string {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getUTCDay()];
}

}

