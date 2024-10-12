import { Component, OnInit } from '@angular/core';
import { Seat } from '../../common/Seat';
import { SeatsService } from '../../services/seats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cinema-room',
  templateUrl: './cinema-room.component.html',
  styleUrl: './cinema-room.component.css'
})
export class CinemaRoomComponent implements OnInit{

  availableSeats: Seat[] = [];

  seats: { occupied: boolean, selected: boolean }[] = [];

  constructor(private seatsService: SeatsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const movieTitle = params['movieTitle'];
      const cityName = params['cityName'];
      const showTime = params['showTime'];
  
      console.log(`Film: ${movieTitle}, Miasto: ${cityName}, Godzina: ${showTime}`);
      this.getSeatsAvailable(cityName, movieTitle, showTime);
      
    });
   
  }

  initializeSeats(): void {
    for (let i = 1; i <= 100; i++) {
      const occupied = this.availableSeats.some(seat => seat.seatNumber === i);
      this.seats.push({ occupied: occupied, selected: false });
    }

      console.log(this.seats)
    
  }
  
  

  selectSeat(index: number): void {
    if (!this.seats[index].occupied) {
      this.seats[index].selected = !this.seats[index].selected;
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


}
