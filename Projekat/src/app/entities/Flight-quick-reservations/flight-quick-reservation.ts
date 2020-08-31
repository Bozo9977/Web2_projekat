import { DatePipe } from '@angular/common';

export enum Class{
    FIRST,
    BUSINESS,
    ECONOMY
}

export class FlightQuickReservation {
    departure: string;
    arrival: string;
    takeOff: DatePipe;
    id: number;
    flightId: number;
    seatNo: number;
    class: Class;
    price: number;
    discount: number;
    reserved: boolean;

}
