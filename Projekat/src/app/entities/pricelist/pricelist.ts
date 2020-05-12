export class Pricelist {
    id: number;
    code: number;
    mark: string;
    rentPerDay: number;
    hourlyRent: number;


    constructor(id: number, code: number, mark: string, rentPerDay: number, hourlyRent: number){
        this.id = id;
        this.code = code;
        this.mark = mark;
        this.rentPerDay = rentPerDay;
        this.hourlyRent = hourlyRent;
    }
}