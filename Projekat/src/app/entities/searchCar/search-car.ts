export class SearchCar {
    kategorija: string;
    search: string;
    id:number;

    constructor(kategorija: string, naziv: string, id: number){
        this.kategorija = kategorija;
        this.search = naziv;
        this.id = id;
    }
}
