import { Injectable } from '@angular/core';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";
  loadCarCompanies(){
    return this.mockedCarCompanies();
  }

  loadAircompanies(){
    return this.http.get(this.BasURI + "/AirCompany/GetAircompanies");
  }

  addCompany(formData){
    if(formData.company == "carcompany")
    {
      return this.http.post(this.BasURI + '/CarCompany/AddCarCompany',formData);
    }
    else 
    {
      return this.http.post(this.BasURI + '/AirCompany/AddAirCompany',formData);
    }
    
  }

  getAirCompanyForUser(UserID: string){
    return this.http.get(this.BasURI + "/AirCompany/GetAircompanyForUser/"+UserID);
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
