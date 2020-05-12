export class BranchOffice {
    id: number;
    name: string;
    city: string;
    address: string;
    telephone: number;

    constructor(id: number, name: string, city: string, address:string, telephone: number){
        this.id=id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.telephone = telephone;
    }
}
