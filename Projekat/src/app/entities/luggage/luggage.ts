export class Luggage {

    Id: number;
    CarryOnPrice: number;
    DuffelPrice: number;
    IdCompany: number;

    // constructor(id: number, carryOn: number, duffel: number, company:number){
    //     this.Id = id;
    //     this.CarryOnPrice = carryOn;
    //     this.DuffelPrice = duffel;
    //     this.IdCompany = company;
    // }

    public constructor(init?: Partial<Luggage>){
        Object.assign(this, init);
    }
}
