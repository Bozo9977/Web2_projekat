import { DatePipe } from '@angular/common';

export enum TripType{
    ROUND_TRIP,
    ONE_WAY,
    MULTY_CITY
}

export enum Class{
    ECONOMY,
    BUSINESS,
    FIRST
}

export class Flight {
    departureCity: string;
    arrivalCity: string;
    takeOff: DatePipe;
    touchDown: DatePipe;
    travelLength: number;
    connections: string[];
    price: number;
    tripTipe: TripType;
    class: Class;

    constructor(departure: string, arrival: string, takeoff: DatePipe, touchdown: DatePipe, length: number, connections: string[], price: number, type: TripType, tripClass: Class){
        this.departureCity = departure;
        this.arrivalCity = arrival;
        this.takeOff = takeoff;
        this.touchDown = touchdown;
        this.travelLength = length;
        this.connections = connections;
        this.price = price;
        this.tripTipe = type;
        this.class = tripClass;
    }

}
