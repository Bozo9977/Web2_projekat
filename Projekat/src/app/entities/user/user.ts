export class User {
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    phoneNumber: string;
    password: string;
    idCompany: Int32Array;


    constructor(name: string, lastName: string, phoneNumber: string, city: string, email: string, password: string, idCompany: Int32Array){
        this.firstName = name;
        this.lastName = lastName;
        this.city = city;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.idCompany = idCompany;
    }

}
