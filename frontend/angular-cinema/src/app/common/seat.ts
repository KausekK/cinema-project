export class Seat {
    available: boolean;
    hallNumber: number;
    seatNumber: number;
  
    constructor(available: boolean, hallNumber: number, seatNumber: number) {
      this.available = available;
      this.hallNumber = hallNumber;
      this.seatNumber = seatNumber;
    }
  }
  