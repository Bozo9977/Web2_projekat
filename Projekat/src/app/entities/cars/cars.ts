export class Cars {
    image: string;
    id: number;
    code: number;
    mark: string;
    yearOfProduction: number;
    fuel: string;
    gearshift: string;
    seat: number;
    door: number;
    airConditioning: string;
    bags: number;

    constructor(image: string, id: number, code: number, mark: string, yearOfProduction: number, fuel: string, gearshift:string, seat: number, door: number, airConditioning: string, bags: number){
        this.image = image;
        this.id=id;
        this.code = code;
        this.mark = mark;
        this.yearOfProduction = yearOfProduction;
        this.fuel = fuel;
        this.gearshift = gearshift;
        this.seat = seat;
        this.door = door;
        this.airConditioning = airConditioning;
        this.bags = bags;
    }
}
