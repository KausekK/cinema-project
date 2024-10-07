export class Movie{
    constructor(
        public id: number, 
        public title: string,
        public type: string,
        public duration: number,
        public language: string,
        public format: string,
        public posterUrl: string,
        public trailerUrl: string
    ){

    }
}