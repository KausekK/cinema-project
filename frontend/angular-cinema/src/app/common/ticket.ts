export class Ticket{
    constructor(
        public id: number,
        public ticketType: string,
        public dayOfWeek: string,
        public price: number
    ){

    }
}