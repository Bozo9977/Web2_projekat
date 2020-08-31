import { Component, OnInit } from '@angular/core';
import { FlightSeat } from 'src/app/entities/flight-seats/flight-seat';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MakeFlightQuickReservations } from 'src/app/entities/MakeFlightQuickReservations/make-flight-quick-reservations';

@Component({
  selector: 'app-flight-quick-reservations',
  templateUrl: './flight-quick-reservations.component.html',
  styleUrls: ['./flight-quick-reservations.component.css']
})
export class FlightQuickReservationsComponent implements OnInit {

  seatsChecked: Array<FlightSeat> = new Array<FlightSeat>();
  economyClass: Array<FlightSeat> = new Array<FlightSeat>();
  businessClass: Array<FlightSeat> = new Array<FlightSeat>();
  firstClass:Array<FlightSeat> = new Array<FlightSeat>();
  price: number;

  discountForm: FormGroup;
  idFlight: number;

  constructor(private flightService: FlightService, private router: ActivatedRoute) 
  {
    router.params.subscribe(params => { this.idFlight = params['id']; });
  }

  ngOnInit(): void {
    this.discountForm = new FormGroup(
    {
        'discount': new FormControl('', [Validators.required, Validators.min(0), Validators.max(80)])
    }
    )

    this.flightService.getFirstClassSeatsForFlight(this.idFlight).subscribe(
      (res: Array<FlightSeat>)=>{
        this.firstClass = res;
      },
      err=>
      {
        console.log((err as HttpErrorResponse).message);
      }
    )

    this.flightService.getBusinessClassSeatsForFlight(this.idFlight).subscribe(
      (res: Array<FlightSeat>)=>{
        this.businessClass = res;
      },
      err=>
      {
        console.log((err as HttpErrorResponse).message);
      }
    )
    this.flightService.getEconomyClassSeatsForFlight(this.idFlight).subscribe(
      (res: Array<FlightSeat>)=>{
        this.economyClass = res;
      },
      err=>
      {
        console.log((err as HttpErrorResponse).message);
      }
    )
  }

  checkSeat(id:FlightSeat){
    this.seatsChecked.push(id);
  }


  createQuickReservations(){
    if(this.discountForm.controls['discount'].invalid){
      alert("Enter discount");
    }else if(this.seatsChecked.length===0){
      alert("Check seats for discount")
    }else{
      let res: MakeFlightQuickReservations = this.discountForm.value;
      res.seats = this.seatsChecked;
      res.flightId = this.idFlight;
      
      this.flightService.makeQuickReservation(res).subscribe(
        (res:any)=>{

        },
        err=>{
          console.log((err as HttpErrorResponse).message);
        }
      )
    }

  }
}
