import { Injectable } from '@angular/core';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  loadCarCompanies(){
    return this.mockedCarCompanies();
  }

  loadAircompanies(){
    return this.mockedAircompanies();
  }

  mockedCarCompanies():Array<CarCompany>{
    let allComp = new Array<CarCompany>();

    const c1 = new CarCompany(1, 'Bozic trans', 'Bastovanska 2a', 'Very OK company', 3.42);
    const c2 = new CarCompany(2, 'Maric tours', 'Marsala Tita 1', 'Excellent internationall company', 5);

    allComp.push(c1);
    allComp.push(c2);

    return allComp;
  }

  mockedAircompanies():Array<Aircompany>{
    let allComp = new Array<CarCompany>();

    const c1 = new CarCompany(1, 'Bozic trans', 'Bastovanska 2a', 'Very OK company', 3.42);
    const c2 = new CarCompany(2, 'Maric tours', 'Marsala Tita 1', 'Excellent internationall company', 5);

    allComp.push(c1);
    allComp.push(c2);

    return allComp;
  }
}
