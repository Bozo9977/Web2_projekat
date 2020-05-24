export class Cars {
    id: string;
    mark: string;
    yearProduction: string;
    fuel: string;
    gearshift: string;
    seat: string;
    door: string;
    airConditioning: string;
    bags: string;
    status: string;
    hourlyRent: string;
    rentPerDay: string;
    imageCar: string;

    constructor(imageCar: string, id: string, mark: string, yearProduction: string, fuel: string, gearshift:string, seat: string, door: string, airConditioning: string, bags: string, status: string, rentPerDay: string, hourlyRent: string){
        this.imageCar = imageCar;
        this.id=id;
        this.mark = mark;
        this.yearProduction = yearProduction;
        this.fuel = fuel;
        this.gearshift = gearshift;
        this.seat = seat;
        this.door = door;
        this.airConditioning = airConditioning;
        this.bags = bags;
        this.status = status;
        this.rentPerDay = rentPerDay;
        this.hourlyRent = hourlyRent;
    }
}
