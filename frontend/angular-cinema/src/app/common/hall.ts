export class Hall{
    hallNumber: number;
    moviePosterUrl: string;
  
    constructor(moviePosterUrl: string, hallNumber: number) {
      this.moviePosterUrl = moviePosterUrl;
      this.hallNumber = hallNumber;
    }
}