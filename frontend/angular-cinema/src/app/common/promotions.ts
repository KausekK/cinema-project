export class Promotions{

    constructor(
        public id: number,
        public title: string,
        public discount: number,
        public description: string,
        public price: number,
        public imageUrl: string,
        public fullDescription: string,
        public fullDescriptionEn: string
    ){}
}