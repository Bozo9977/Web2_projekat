import { FlightReceive } from '../flight/flight';

export enum Class{
    FIRST,
    BUSINESS,
    ECONOMY
}

export class FlightSeat {

    Id:number; 
    reserved: boolean;
    price: number; 
    Class : Class;
    Flight: number; 
}
