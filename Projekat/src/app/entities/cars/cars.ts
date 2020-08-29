export class Cars {
    id: string;
    mark: string;
    yearProduction: number;
    fuel: string;
    gearshift: string;
    seat: number;
    door: number;
    airConditioning: string;
    bags: number;
    rentPerDay: number;
    imageCar: string;
    idCompany: number;

    constructor(imageCar: string, id: string, mark: string, yearProduction: number, fuel: string, gearshift:string, seat: number, door: number, airConditioning: string, bags: number, rentPerDay: number, idCompany: number){
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
        this.rentPerDay = rentPerDay;
        this.idCompany = idCompany;
    }

}
