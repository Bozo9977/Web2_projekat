
export class AvailableCar {
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
    imageCar: string;
    idCompany: number;
    rating: number;
    price: number;

    constructor(imageCar: string, id: string, mark: string, yearProduction: string, fuel: string, gearshift:string, seat: string, door: string, airConditioning: string, bags: string, status: string, idCompany: number, rating: number, price:number){
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
        this.idCompany = idCompany;
        this.price = price;
        this.rating = rating;
    }
}


