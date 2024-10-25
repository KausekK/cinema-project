import { Component, OnInit } from '@angular/core';
import { UpcomingMoviesService } from '../../services/upcoming-movies.service';
import { UpcomingMovies } from '../../common/upcoming-movies';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']  
})
export class UpcomingMoviesComponent implements OnInit {

  upcomingMovies: UpcomingMovies[] = []; 
  pageNumber: number = 1;  
  pageSize: number = 10;                  
  totalElements: number = 0;              

  constructor(private upcomingMoviesService: UpcomingMoviesService) {}

  ngOnInit(): void {
    this.getPaginatedUpcomingMovies();
  }

  getPaginatedUpcomingMovies(): void {
    this.upcomingMoviesService.getUpcomingMovies(this.pageNumber - 1, this.pageSize).subscribe({
      next: data => {
        this.upcomingMovies = data._embedded.upcomingMovies;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
        console.log(this.upcomingMovies);
      },
      error: error => {
        console.error('Błąd podczas pobierania danych', error);
      },
      complete: () => {
        console.log('Pobieranie filmów zakończone');
      }
    });
    
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1; 
    this.pageSize = event.pageSize;    
    this.getPaginatedUpcomingMovies();
  }
}
