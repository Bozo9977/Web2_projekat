import { DatePipe } from '@angular/common';

export class DiscountCar {
    endDay: DatePipe;
    startDay: DatePipe;
    procenat: number;
    idCar: string;

    constructor(endDay: DatePipe, startDat: DatePipe, procenat: number, idCar: string)
    {
        this.endDay = endDay;
        this.startDay = startDat;
        this.procenat = procenat;
        this.idCar = idCar;
    }
}
