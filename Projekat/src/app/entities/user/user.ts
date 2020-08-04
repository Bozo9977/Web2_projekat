export class User {
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    password: string;


    constructor(name: string, lastName: string, city: string, email: string, password: string){
        this.firstName = name;
        this.lastName = lastName;
        this.city = city;
        this.email = email;
        this.password = password
    }

}
