import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/shared/data.service';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../common/ticket';

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrl: './ticket-selection.component.css'
})
export class TicketSelectionComponent implements OnInit{
  movieTitle: string = '';
  cityName: string = '';
  showTime: string = '';
  hallNumber: number = 0;
  selectedDay: string = '';
  moviePosterUrl: string = ''
  currentStep: number = 2; 
  seatsSelected = new Map<number, number []>
  ticketPrice: Ticket[] = [];
  selectedTicketType: string = 'normalny';
  ticket: number = 0;

constructor(private dataService: DataService,
  private ticketsService: TicketsService
){}
  ngOnInit(): void{
    this.dataService.movieTitle$.subscribe(title => this.movieTitle = title);
    this.dataService.cityName$.subscribe(city => this.cityName = city)
    this.dataService.hallNumber$.subscribe(hall => this.hallNumber = hall)
    this.dataService.selectedDay$.subscribe(day => this.selectedDay = day);
    this.dataService.showTime$.subscribe(time => this.showTime = time);
    this.dataService.posterUrl$.subscribe(poster => this.moviePosterUrl = poster)
    this.dataService.selectedSeats$.subscribe(seats => this.seatsSelected = seats)
    this.changeDaySymbolToName(this.selectedDay)
    console.log(this.seatsSelected)
  }

  setStep(step: number) {
    this.currentStep = step;
  }

 getTicketsPrice(ticketType: string, dayOfWeek: string){
  this.ticketsService.getPriceForTickets(ticketType, dayOfWeek).subscribe(
    data =>{
        this.ticketPrice = data;
        this.ticket = data[0].price;
    }
  )
 }

 changeDaySymbolToName(day: string){
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
  }
 }

}
