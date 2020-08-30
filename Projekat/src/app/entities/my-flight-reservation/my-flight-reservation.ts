import { DatePipe } from '@angular/common';

export class MyFlightReservation {
    departureDate: DatePipe;
    from: string;
    to: string;
    idReservation: number;
    canBeErased: boolean;
}
