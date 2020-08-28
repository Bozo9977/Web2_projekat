import { DatePipe } from '@angular/common';

export class BusinessReport {
    Today: DatePipe;

    ratingPerDay: string;

    ratingPerWeek: string;

    ratingPerMonth: string;

    constructor(today: DatePipe, ratingPerDay: string, ratingPerWeek: string, ratingPerMonth: string){
        this.Today = today;
        this.ratingPerDay = ratingPerDay;
        this.ratingPerMonth = ratingPerMonth;
        this.ratingPerWeek = ratingPerWeek;
    }
}
