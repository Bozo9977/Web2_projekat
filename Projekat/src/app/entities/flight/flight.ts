import { DatePipe } from '@angular/common';
import { Destination } from '../destination/destination';

export class Flight {
    departure: string;
    arrival: string;
    takeOff: DatePipe;
    touchDown: DatePipe;
    length: number;
    connections: string[];
    priceFirst: number;
    numberFirst: number;
    priceBusiness: number;
    numberBusiness: number;
    priceEconomy: number;
    numberEconomy: number;
    
    constructor(departure: string, arrival: string, takeoff: DatePipe, touchdown: DatePipe, length: number, connections: string[], pricefirst: number, numberfirst: number, pricebusiness: number, numberbusiness: number, priceeconomy: number, numbereconomy: number){
        this.departure = departure;
        this.arrival = arrival;
        this.takeOff = takeoff;
        this.touchDown = touchdown;
        this.length = length;
        this.connections = connections;
        //this.connections = connections;
        this.priceFirst = pricefirst;
        this.numberFirst = numberfirst;
        this.priceBusiness = pricebusiness;
        this.numberBusiness = numberbusiness;
        this.priceEconomy = priceeconomy;
        this.numberEconomy = numbereconomy;
    }

}

export class FlightReceive{
    departure: string;
    arrival: string;
    takeOff: DatePipe;
    touchDown: DatePipe;
    length: number;
    connections: Destination[];
    priceFirst: number;
    numberFirst: number;
    priceBusiness: number;
    numberBusiness: number;
    priceEconomy: number;
    numberEconomy: number;
    numberOfConnections: number;
}
