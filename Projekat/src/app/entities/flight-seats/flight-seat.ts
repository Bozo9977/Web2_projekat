import { FlightReceive } from '../flight/flight';

export enum Class{
    FIRST,
    BUSINESS,
    ECONOMY
}

export class FlightSeat {

    Id:number; 
    Reserved: boolean;
    Price: number; 
    Class : Class;
    Flight: number; 
}
