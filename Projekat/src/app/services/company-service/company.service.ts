import { Injectable } from '@angular/core';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { BusinessReport } from 'src/app/entities/businessReport/business-report';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Luggage } from 'src/app/entities/luggage/luggage';
import { Income } from 'src/app/entities/income/income';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyPom2: CarCompany;
  pom: FormData;
  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";
  loadCarCompanies(): Observable<CarCompany[]>{
    return this.http.get<CarCompany[]>(this.BasURI + "/CarCompany/GetCarcompanies");
  }

  loadAircompanies(){
    return this.http.get(this.BasURI + "/AirCompany/GetAircompanies");
  }

  getAverageForCompany(id: number): Observable<CarCompany[]>{
    return this.http.get<CarCompany[]>(this.BasURI + "/CarCompany/GetAverageForCompany/" + id);
  }


  getBusinessAverageForCompany(id: number): Observable<BusinessReport[]>{
    console.log("USAOOOOOOO");
    return this.http.get<BusinessReport[]>(this.BasURI + "/CarCompany/GetBusinessAverageForCompany/" + id);
  }

  getIncomeReportForCompany(id: number): Observable<Income[]>{
    console.log("USAOOOOOOO INCOMEREPORT", id);
    return this.http.get<Income[]>(this.BasURI + "/CarCompany/GetIncomeReportForCompany/" + id);
  }

  getAllCities(): Observable<BranchOffice[]>{
    return this.http.get<BranchOffice[]>(this.BasURI + "/BranchOffice/GetAllCities");
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

  addLuggage(formData){
    return this.http.post<any>(this.BasURI + '/AirCompany/AddLuggage', formData);
  }

  getLuggageInfo(id:number){
    return this.http.get<Luggage[]>(this.BasURI + '/AirCompany/GetLuggageInfoForCompany/'+id);
  }

  changeLuggage(formData){
    console.log(formData)
     return this.http.put(this.BasURI + '/AirCompany/ChangeLuggageForCompany',formData);
  }
}
