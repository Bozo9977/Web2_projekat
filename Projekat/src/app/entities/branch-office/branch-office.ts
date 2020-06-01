export class BranchOffice {
    id: number;
    name: string;
    city: string;
    address: string;
    telephone: string;

    constructor(id: number, name: string, city: string, address:string, telephone: string){
        this.id=id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.telephone = telephone;
    }
}
