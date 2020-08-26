import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/entities/flight/flight';

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
}
