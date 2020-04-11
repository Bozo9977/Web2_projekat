export class User {
    name: string;
    lastName: string;
    city: string;
    email: string;
    password: string;
    phone: string;
    photo: ImageBitmap;

    constructor(name: string, lastName: string, city: string, email: string, password: string){
        this.name = name;
        this.lastName = lastName;
        this.city = city;
        this.email = email;
        this.password = password
    }

}
