export class Aircompany {
    id: number;
    name: string;
    address: string;
    description: string;
    rating: number;

    constructor(id: number, name: string, address: string, description: string, rating: number){
        this.id=id;
        this.address = address;
        this.description=description;
        this.name = name;
        this.rating=rating;
    }
}
