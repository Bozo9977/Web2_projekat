export class CarCompany {
    id: number;
    name: string;
    address: string;
    description: string;
    averageRating: string

    constructor(id: number, name: string, address: string, description: string, rating: string){
        this.id=id;
        this.address = address;
        this.description=description;
        this.name = name;
        this.averageRating = rating;
    }

    

}
