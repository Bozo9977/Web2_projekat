export class Income {
    incomePerMonth: string;
    incomePerYear: string;
    IncomePer3Month: string;
    incomePer6Month: string;
    year: string;
    start3: string;
    start6: string;
    end6:string;
    end3: string;
    month: string;
    constructor(incomePerMonth: string, incomePerYear: string, IncomePer3Month: string, Year: string, start3: string, end3: string, month: string, incomePer6Month: string, start6: string, end6: string){
        this.incomePerMonth = incomePerMonth;
        this.incomePerYear = incomePerYear;
        this.IncomePer3Month = IncomePer3Month;
        this.year = Year;
        this.start3 = start3;
        this.end3 = end3;
        this.month = month;
        this.end6 = end6;
        this.start6 = start6;
        this.incomePer6Month = incomePer6Month;
    }
}
