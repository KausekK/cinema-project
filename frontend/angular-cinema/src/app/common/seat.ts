export class Seat {
    available: boolean;
    hallName: string;
    seatNumber: number;
  
    constructor(available: boolean, hallName: string, seatNumber: number) {
      this.available = available;
      this.hallName = hallName;
      this.seatNumber = seatNumber;
    }
  }
  