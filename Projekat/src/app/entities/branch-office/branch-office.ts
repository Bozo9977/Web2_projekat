export class BranchOffice {
    id: number;
    name: string;
    city: string;
    address: string;
    telephone: string;
    idCompany: number;

    constructor(id: number, name: string, city: string, address:string, telephone: string, idCompany: number){
        this.id=id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.telephone = telephone;
        this.idCompany = idCompany;
    }
}
