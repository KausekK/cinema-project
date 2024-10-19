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
  moviePosterUrl: string = '';
  currentStep: number = 2;
  seatsSelected = new Map<number, number[]>();
  ticketTypeSelection: { [key: string]: string } = {};
  serviceFee: number = 2.0;
  ticketPrices: Ticket[] = [];
  ticketTypes: string[] = [];
  today = new Date();

  constructor(
    private dataService: DataService,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.dataService.movieTitle$.subscribe(title => (this.movieTitle = title));
    this.dataService.cityName$.subscribe(city => (this.cityName = city));
    this.dataService.hallNumber$.subscribe(hall => (this.hallNumber = hall));
    this.dataService.selectedDay$.subscribe(day => {
      this.changeDaySymbolToName(day); 
    });
    this.dataService.showTime$.subscribe(time => (this.showTime = time));
    this.dataService.posterUrl$.subscribe(poster => (this.moviePosterUrl = poster));
    this.dataService.selectedSeats$.subscribe(seats => (this.seatsSelected = seats));

    this.initializeTicketTypeSelection();

    this.fetchTicketTypesAndPrices(this.selectedDay);
  }

  setStep(step: number) {
    this.currentStep = step;
  }

  changeDaySymbolToName(day: string) {
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
      default:
        this.selectedDay = this.today.toLocaleDateString('pl-PL', {weekday: 'long'});
        this.selectedDay = this.selectedDay.charAt(0).toUpperCase() + this.selectedDay.slice(1);
    }
  }

  initializeTicketTypeSelection() {
    this.seatsSelected.forEach((seats, row) => {
      seats.forEach(seat => {
        const seatId = `${row}-${seat}`;
        this.ticketTypeSelection[seatId] = ''; 
      });
    });
  }

  fetchTicketTypesAndPrices(dayOfWeek: string) {
    this.ticketsService.getTicketTypesAndPrices(dayOfWeek).subscribe(data => {
      this.ticketPrices = data;
      this.ticketTypes = [...new Set(data.map(ticket => ticket.ticketType))];
    });
  }

  getTicketPrice(ticketType: string): number {
    const ticket = this.ticketPrices.find(
      t => t.ticketType === ticketType
    );
    return ticket ? ticket.price : 0;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    if (this.ticketPrices.length === 0) {
      return totalPrice;
    }
    for (const seatId in this.ticketTypeSelection) {
      const ticketType = this.ticketTypeSelection[seatId];
      const price = this.getTicketPrice(ticketType);
      totalPrice += price;
    }
    totalPrice += this.serviceFee; 
    return totalPrice;
  }

  getTotalTickets(): number {
    return Object.keys(this.ticketTypeSelection).length;
  }

  allTicketTypesSelected(): boolean {
    for (const seatId in this.ticketTypeSelection) {
      if (!this.ticketTypeSelection[seatId]) {
        return false;
      }
    }
    return true;
  }
}