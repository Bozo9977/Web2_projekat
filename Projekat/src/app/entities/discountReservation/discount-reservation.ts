import { DatePipe } from '@angular/common';

export class DiscountReservation {
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
    popust: string;
    endDay: DatePipe;
    startDay: DatePipe;

    constructor(imageCar: string, id: string, mark: string, yearProduction: number, fuel: string, gearshift:string, seat: number, door: number, airConditioning: string, bags: number, rentPerDay: number, price: string, startDay: DatePipe, endDay: DatePipe){
        this.imageCar = imageCar;
        this.mark = mark;
        this.yearProduction = yearProduction;
        this.fuel = fuel;
        this.gearshift = gearshift;
        this.seat = seat;
        this.door = door;
        this.airConditioning = airConditioning;
        this.bags = bags;
        this.rentPerDay = rentPerDay;
        this.popust = price;
        this.startDay = startDay;
        this.endDay = endDay;
    }
}
