import { Movie } from "./movie";

export class Show{
    constructor(
        public movie: Movie,
        public showTime: string,
        public day_of_week: string,
        public hallNumber: string
    ){

    }
}