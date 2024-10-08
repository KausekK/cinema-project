export class Movie{
    constructor(
        public id: number, 
        public title: string,
        public type: string,
        public duration: number,
        public language: string,
        public format: string,
        public posterUrl: string,
        public trailerUrl: string,
        public director: string,
        public description: string,
        public ageRestriction: number
    ){

    }
}