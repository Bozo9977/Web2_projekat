export class Aircompany {
    id: number;
    name: string;
    address: string;
    description: string;


    constructor(id: number, name: string, address: string, description: string){
        this.id=id;
        this.address = address;
        this.description=description;
        this.name = name;
    }
}
