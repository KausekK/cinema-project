export class AddShowClass{
    constructor(
        public movieId: number,
        public showTime: string,
        public cityId: number, 
        public hallId: number, 
        public dayOfWeek: string,
        public duration: number,
        public id?: number
      ) {}
}