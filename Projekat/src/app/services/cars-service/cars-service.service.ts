import { Injectable } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableCar } from 'src/app/entities/available-car';
import { ReservationCars } from 'src/app/entities/reservationCar/reservation-cars';
import { Rate } from 'src/app/entities/rate/rate';

@Injectable({
  providedIn: 'root'
})
export class CarsServiceService {

  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";

  loadCars(){
    return this.mockedCars();
  }

  addCar(car: Cars){
      return this.http.post(this.BasURI + '/CarCompany/AddCar', car);
  }

  deleteCar(id: string): Observable<{}>{
    return this.http.delete(this.BasURI + '/CarCompany/DeleteCar/' + id);

  }

  getCars(id: number): Observable<Cars[]>{
    console.log("SERVIS: COMPANYID: ", + id);
    return this.http.get<Cars[]>(this.BasURI + '/CarCompany/GetCars/' + id);
    
  }

  getAllCars(id:string){
    return this.http.get<AvailableCar[]>(this.BasURI + '/CarCompany/GetAllCars/' + id);  
  }

  getOneCar(id: string): Observable<Cars>{
    
    return this.http.get<Cars>(this.BasURI + '/CarCompany/GetOneCar/' + id);
    
  }

  searchAvailableCars(formData: ReservationCars){
    return this.http.post<AvailableCar[]>(this.BasURI + '/Reservation/SearchAvailableCar', formData);
  }

  updateCar(formData){
    
    return this.http.put<Cars>(this.BasURI + '/CarCompany/UpdateCar', formData);
    
  }

  newReservationCar(formData: ReservationCars)
  {
    return this.http.post(this.BasURI + '/Reservation/CreateReservation', formData);
  }

  getReservations(id: string)
  {
    return this.http.get<Rate[]>(this.BasURI + '/Reservation/GetReservations/' + id);  
  }

  CreateRate(rate: Rate){
    return this.http.post(this.BasURI + '/Reservation/CreateRate', rate);
  }
  
  mockedCars():Array<Cars>{
    let allComp = new Array<Cars>();

    //const c1 = new Cars("assets/images/audi.jpg" ,1, 5544, 'Audi A4', 2010, 'Disel', 'Manual', 5, 4, 'Yes', 2, 1200, 500);
   // const c2 = new Cars("assets/images/bmw.jpg" ,2, 5545, 'Bmw', 2015, 'Disel', 'Automatic', 5, 5, 'Yes', 4, 1500, 700);
    //const c3 = new Cars("assets/images/megan.jpg" ,3, 5546, 'Megan', 2012, 'Disel', 'Manual', 5, 5, 'Yes', 3, 1000, 300);

    //allComp.push(c1);
    //allComp.push(c2);
    //allComp.push(c3);

    return allComp;
  }


}
