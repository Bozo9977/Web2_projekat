import { DatePipe } from '@angular/common';

export class Flight {
    departureCity: string;
    arrivalCity: string;
    takeOff: DatePipe;
    touchDown: DatePipe;
    travelLength: number;
    connections: string[];
    price: number;

    constructor(departure: string, arrival: string, takeoff: DatePipe, touchdown: DatePipe, length: number, connections: string[], price: number){
        this.departureCity = departure;
        this.arrivalCity = arrival;
        this.takeOff = takeoff;
        this.touchDown = touchdown;
        this.travelLength = length;
        this.connections = connections;
        this.price = price;
    }

}
