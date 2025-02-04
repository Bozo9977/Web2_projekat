import { Injectable } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableCar } from 'src/app/entities/available-car';
import { ReservationCars } from 'src/app/entities/reservationCar/reservation-cars';
import { Rate } from 'src/app/entities/rate/rate';
import { SearchCar } from 'src/app/entities/searchCar/search-car';
import { DiscountCar } from 'src/app/entities/discountCar/discount-car';
import { DiscountReservation } from 'src/app/entities/discountReservation/discount-reservation';
import { DiscountUser } from 'src/app/entities/discountUser/discount-user';

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
     console.log("CARS SERVIC:", car);
      return this.http.post(this.BasURI + '/CarCompany/AddCar', car);
  }

  newFastReservationCar(reservationToSend: DiscountUser)
  {
    return this.http.post(this.BasURI + '/CarCompany/CreateFastRate', reservationToSend);  
  }

  addDiscountCar(discount: DiscountCar)
  {
    console.log("CARS SERVIC:", discount);
    return this.http.post(this.BasURI + '/CarCompany/AddDiscountCar', discount); 
  }
  deleteCar(id: string): Observable<{}>{
    return this.http.delete(this.BasURI + '/CarCompany/DeleteCar/' + id);

  }

  getCars(id: number): Observable<Cars[]>{
    console.log("SERVIS: COMPANYID: ", + id);
    return this.http.get<Cars[]>(this.BasURI + '/CarCompany/GetCars/' + id);
    
  }

  loadSaleReservation(id: string): Observable<DiscountReservation[]>
  {
    
    return this.http.get<DiscountReservation[]>(this.BasURI + '/CarCompany/GetDiscountCars/' + id);
  }

  getAllCars(id:string){
    return this.http.get<AvailableCar[]>(this.BasURI + '/CarCompany/GetAllCars/' + id);  
  }

  getOneCar(id: string): Observable<Cars>{
    
    return this.http.get<Cars>(this.BasURI + '/CarCompany/GetOneCar/' + id);
    
  }

  getAverageForCar(id: number){
    return this.http.get<AvailableCar[]>(this.BasURI + '/CarCompany/GetAverageForCar/' + id);   
  }

  searchCarsFun(formData){
    console.log("SERVIS: ", formData);
    return this.http.post<Cars[]>(this.BasURI + '/CarCompany/SearchAvailableCar', formData);
  }

  searchCarsFunction(formData: SearchCar){
    console.log("SERVIS: ", formData);
    return this.http.post<AvailableCar[]>(this.BasURI + '/CarCompany/SearchAvailableCar', formData);
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


  cancelReservation(id: string){
    return this.http.delete(this.BasURI + "/Reservation/CancelCarReservation/"+id);
  }

  cancelReservationWithFlight(id: number){
    return this.http.delete(this.BasURI + "/Reservation/DeleteCarReservationWithFlight/" + id);
  }

}
