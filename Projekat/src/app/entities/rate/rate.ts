import { DatePipe } from '@angular/common';

export class Rate {
    endDay: DatePipe;
    startDay: DatePipe;
    id: string;
    vehicle: string;
    serviceName: string

    constructor(endDay: DatePipe, startDay: DatePipe,  id:string, vehicle: string, serviceName: string){
        this.endDay = endDay;
        this.startDay = startDay;
        this.id = id;
        this.serviceName = serviceName;
        this.vehicle = vehicle;
    }
}

