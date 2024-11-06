import { Component, OnInit } from '@angular/core';
import { SeatsService } from '../../services/seats.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Seat } from '../../common/Seat';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../common/hall';
import { DataService } from '../../services/shared/data.service';

@Component({
  selector: 'app-cinema-room',
  templateUrl: './cinema-room.component.html',
  styleUrl: './cinema-room.component.css'
})
export class CinemaRoomComponent implements OnInit{
  
  availableSeats: Seat[] = [];
  hall: Hall[] = [];
  countSeatsReservation: number [] =[];
  currentStep: number = 1; 
  showId: number = 0;
  movieTitle: string = '';
  cityName: string = '';
  showTime: string = '';
  hallNumber: number = 0;
  moviePosterUrl: string ='';
  selectedDay: string = '';
  rowsAndSeats = new Map<number, number[]>;

  seats: { occupied: boolean, selected: boolean }[] = [];

  constructor(private seatsService: SeatsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private hallService: HallService,
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.showId = params['id'];
      this.movieTitle = params['movieTitle'];
      this.cityName = params['cityName'];
      this.showTime = params['showTime'];
  
      console.log(`Film: ${this.movieTitle}, Miasto: ${this.cityName}, Godzina: ${this.showTime}`);
      this.getSeatsAvailable(this.cityName, this.movieTitle, this.showTime);
      this.getHall(this.cityName, this.movieTitle, this.showTime)
      console.log(this.movieTitle)
      this.dataService.setMovieTitle(this.movieTitle);
      this.dataService.setCityName(this.cityName);
      this.dataService.setShowTime(this.showTime);
      this.dataService.setShowId(this.showId);
    });
    
  
   
    this.dataService.selectedDay$.subscribe(day => {
      this.selectedDay = day;
      switch (day) {
        case 'Pn':
          this.selectedDay = 'Poniedziałek';
          break;
        case 'Wt':
          this.selectedDay = 'Wtorek';
          break;
        case 'Śr':
          this.selectedDay = 'Środa';
          break;
        case 'Czw':
          this.selectedDay = 'Czwartek';
          break;
        case 'Pt':
          this.selectedDay = 'Piątek';
          break;
        case 'So':
          this.selectedDay = 'Sobota';
          break;
        case 'Nd':
          this.selectedDay = 'Niedziela';
          break;
      }
    });
  }

  initializeSeats(): void {
    for (let i = 1; i <= 100; i++) {
      const occupied = this.availableSeats.some(seat => seat.seatNumber === i);
      this.seats.push({ occupied: occupied, selected: false });
      
    }    
  }

  selectSeat(index: number): void {
    if (!this.seats[index].occupied) {
      this.seats[index].selected = !this.seats[index].selected;
  
      const row = this.getRowFromSeatIndex(index);    
      const seatInRow = this.getSeatFromSeatIndex(index);  
  
      if (this.seats[index].selected) {
        this.countSeatsReservation.push(index + 1);
  
        if (this.rowsAndSeats.has(row)) {
          this.rowsAndSeats.get(row)!.push(seatInRow); 
        } else {
          this.rowsAndSeats.set(row, [seatInRow]); 
        }
      } else {
        this.countSeatsReservation = this.countSeatsReservation.filter(seatIndex => seatIndex !== index);
  
        const seatsInRow = this.rowsAndSeats.get(row);
        if (seatsInRow) {
          const updatedSeatsInRow = seatsInRow.filter(seat => seat !== seatInRow);
          if (updatedSeatsInRow.length > 0) {
            this.rowsAndSeats.set(row, updatedSeatsInRow); 
          } else {
            this.rowsAndSeats.delete(row); 
          }
        }
      }
  
      this.dataService.setSelectedSeats(this.rowsAndSeats);
      this.dataService.setSelectedSeatsNumber(this.countSeatsReservation);
      console.log("Zarezerwowane miejsca:", this.countSeatsReservation);
      console.log("Rzędy i miejsca:", this.rowsAndSeats);
    }
  }
  

   getSeatsAvailable(cityName: string, title: string, showTime: string){
      this.seatsService.getTakenSeats(cityName, title, showTime).subscribe(
        data=>{
          this.availableSeats = data;
          console.log(this.availableSeats)
          this.initializeSeats();
        }
      )
  }

  getTotalRows(): number[] {
    const result = [];
    for (let i = 0; i < Math.ceil(this.seats.length / 10); i++) {
      result.push(i);
    }
    return result;
  }

  getRowFromSeatIndex(seatIndex: number): number {
    return Math.floor(seatIndex / 10) + 1;
  }
  
  
  getSeatFromSeatIndex(seatIndex: number): number {
    return (seatIndex % 10) + 1; 
  }
  

  buyTickets(): void {
    this.router.navigate(['/ticket-selection'], 
      // { state: { selectedSeats: this.countSeatsReservation } }
    );
  }

  setStep(step: number) {
    this.currentStep = step;
  }

  getHall(cityName: string, title: string, showTime: string){
      this.hallService.getHallForSpecificShow(cityName, title, showTime).subscribe(
        data => {
          this.hall = data;
          console.log(this.hall)
          if (this.hall.length > 0) {
            this.hallNumber = this.hall[0].hallNumber;
            this.moviePosterUrl = this.hall[0].moviePosterUrl
            console.log(this.moviePosterUrl)
            this.dataService.setPosterUrl(this.moviePosterUrl);
            this.dataService.setHallNumber(this.hallNumber);
          }
        }
      )
  }
 
  
}
