import { Injectable } from '@angular/core';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyPom2: CarCompany;
  pom: FormData;
  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";
  loadCarCompanies(){
    return this.http.get(this.BasURI + "/CarCompany/GetCarcompanies");
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

  getCarCompanyForUser(UserID: string){
    return this.http.get(this.BasURI + "/CarCompany/GetCarcompanyForUser/"+UserID);
  }

  updateCompanyService(carCompany: CarCompany){
  //  this.companyPom2 = new CarCompany(formData.id, formData.name, formData.address, formData.description, formData.rating);
   //console.log("COMPANIPOM", this.companyPom2);
  /*  this. pom = new FormData();
    this.pom.append("id", carCompany.id.toString());
    this.pom.append("name", carCompany.name);
    this.pom.append("address", carCompany.address);
    this.pom.append("description", carCompany.description);
    console.log("SERVIS: ", this.pom);
    return this.http.post(this.BasURI + '/UserController/UpdateCompanyService', this.pom);*/
    return this.http.put<CarCompany>(this.BasURI + '/User/UpdateCompanyService', carCompany);
  }



}
