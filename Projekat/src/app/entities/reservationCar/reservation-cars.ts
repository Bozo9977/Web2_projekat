import { DatePipe } from '@angular/common';

export class ReservationCars {
    City1: string;
    City2: string;
    Mark: string;
    Number: string;
    endDay: DatePipe;
    endTime: string;
    startDay: DatePipe;
    startTime: string;
    idCompany: string;

    constructor(city1:string, city2:string, mark:string, number:string, endDay: DatePipe, endTime: string, startDay: DatePipe, startTime: string, idCompany:string){
        this.City1 = city1;
        this.City2 = city2;
        this.Mark = mark;
        this.Number = number;
        this.endDay = endDay;
        this.endTime = endTime;
        this.startDay = startDay;
        this.startTime = startTime;
        this.idCompany = idCompany;
    }
}
