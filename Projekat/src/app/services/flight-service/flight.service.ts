import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight, FlightReceive } from 'src/app/entities/flight/flight';
import { FlightSeat } from 'src/app/entities/flight-seats/flight-seat';
import { SearchCar } from 'src/app/entities/searchCar/search-car';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';
import { MyFlightReservation } from 'src/app/entities/my-flight-reservation/my-flight-reservation';

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

}
