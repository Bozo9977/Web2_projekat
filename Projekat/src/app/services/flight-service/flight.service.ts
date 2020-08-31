import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight, FlightReceive } from 'src/app/entities/flight/flight';
import { FlightSeat } from 'src/app/entities/flight-seats/flight-seat';
import { SearchCar } from 'src/app/entities/searchCar/search-car';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';
import { MyFlightReservation } from 'src/app/entities/my-flight-reservation/my-flight-reservation';
import { Observable } from 'rxjs';
import { MakeFlightQuickReservations } from 'src/app/entities/MakeFlightQuickReservations/make-flight-quick-reservations';
import { FlightQuickReservation } from 'src/app/entities/Flight-quick-reservations/flight-quick-reservation';
import { Rate } from 'src/app/entities/rate/rate';
import { BusinessReport } from 'src/app/entities/businessReport/business-report';
import { IncomeReport } from 'src/app/entities/incomeReport/income-report';
import { Income } from 'src/app/entities/income/income';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }
  readonly BasURI = "https://localhost:44314/api";
  addFlight(flight){
    return this.http.post(this.BasURI + '/Flights/AddFlight',flight);
  }

  getFlights(){
    return this.http.get<any[]>(this.BasURI +'/Flights/GetFlights');
  }
  getFlight(id: number){
    return this.http.get<Flight>(this.BasURI + '/Flights/GetFlight/'+id);
  }

  getFlightsForCompany(id: number){
    return this.http.get<any[]>(this.BasURI+'/Flights/GetFlightsForCompany/'+id);
  }

  changeFlight(formData){
    return this.http.put(this.BasURI+"/Flights/ChangeFlight", formData);
  }

  searchFlights(formData){
    return this.http.post(this.BasURI +'/Flights/GetSearchedFlights',formData);
  }

  getReservations(id: string)
  {
    return this.http.get<Rate[]>(this.BasURI + '/Reservation/GetFlightReservations/' + id);  
  }

  getFirstClassSeatsForFlight(id:number){
    return this.http.get<FlightSeat[]>(this.BasURI + '/Flights/GetFirstClassSeatsForFlight/' + id);
  }

  getBusinessClassSeatsForFlight(id:number){
    return this.http.get<FlightSeat[]>(this.BasURI + '/Flights/GetBusinessClassSeatsForFlight/' + id);
  }

  getEconomyClassSeatsForFlight(id:number){
    return this.http.get<FlightSeat[]>(this.BasURI + '/Flights/GetEconomyClassSeatsForFlight/' + id);
  }


  searchFlightsFunction(formData: SearchCar){
    console.log("SERVIS: ", formData);
    return this.http.post<FlightReceive[]>(this.BasURI + '/Flights/SearchAvailableFlights', formData);
  }

  makeReservation(res: FlightReservation){
    return this.http.post(this.BasURI + '/Flights/MakeReservation', res);
  }

  getFlightReservationsForUser(id: string){
    return this.http.get<MyFlightReservation[]>(this.BasURI + '/Flights/GetMyReservations/'+id);
  }

  cancelFlightReservation(id:number): Observable<{}>{
    return this.http.delete(this.BasURI + '/Flights/CancelFlight/' + id);
  }

  makeQuickReservation(res: MakeFlightQuickReservations){
    return this.http.post(this.BasURI + '/Flights/MakeQuickReservations', res);
  }

  getQuickReservationsForFlight(id:number){
    return this.http.get<FlightQuickReservation>(this.BasURI + '/Flights/GetQuickReservationsForFlight/'+id);
  }


  bookQuickFlightRes(id){
    return this.http.put(this.BasURI + '/Flights/BookQuickFlightReservation/'+ id,id);
  }

  acceptFlightInvite(id:string){
    return this.http.put(this.BasURI + '/Flights/AcceptFlightInvitation/'+id, id);
  }

  getBusinessReport(id: number){
    return this.http.get<BusinessReport[]>(this.BasURI + "/AirCompany/GetBusinessReportForAircompany/"+id);
  }

  getIncomeReport(id:number){
    return this.http.get<Income[]>(this.BasURI + '/Aircompany/GetIncomeReportForCompany/'+id);
  }

  deleteFlight(id:number){
    return this.http.delete(this.BasURI +'/Flights/DeleteFlight/'+id);
  }
}
