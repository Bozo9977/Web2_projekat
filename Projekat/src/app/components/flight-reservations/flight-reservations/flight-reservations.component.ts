import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { FlightReceive } from 'src/app/entities/flight/flight';
import { FlightSeat, Class } from 'src/app/entities/flight-seats/flight-seat';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/entities/user/user';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.css']
})
export class FlightReservationsComponent implements OnInit {

  flights: FlightReceive[] = [];
  

  firstClass: FlightSeat[] = [];
  businessClass: Array<FlightSeat> = new Array<FlightSeat>();
  economyClass: Array<FlightSeat> = new Array<FlightSeat>();

  allSeats: Array<FlightSeat> = new Array<FlightSeat>();

  id: number;

  seatsChecked: Array<FlightSeat> = new Array<FlightSeat>();

  friends: User[];
  invitedFriends: User[] =[];
  inviteClicked: boolean = false;

  price:number = 0;

  reservationForm: FormGroup;
  constructor(private flightService: FlightService, private route: ActivatedRoute, private userService: UserService, private router: Router)
  {
    route.params.subscribe(params => { this.id = params['id']; });


    // console.log(this.seats);
    // this.firstClass = this.getFirstClass(this.seats);
    //   console.log(this.firstClass);
  }

  ngOnInit(): void {

    this.reservationForm = new FormGroup({
      'passport': new FormControl('',Validators.required),
      'rentCar': new FormControl()
    })


    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];
    this.userService.getFriendsForUser(UserID).subscribe(
      (res:any)=>{
        this.friends = res as User[];
        console.log(this.friends);
      },
      err=>{
        console.log(err);
      }
    )

    this.flightService.getFirstClassSeatsForFlight(this.id).subscribe(
      (res: FlightSeat[])=>{
        this.firstClass = res;
      },
      err=>{
        console.log((err as HttpErrorResponse).message);
      }
    )

    this.flightService.getBusinessClassSeatsForFlight(this.id).subscribe(
      (res: FlightSeat[])=>{
        this.businessClass = res;
        
      },
      err=>{
        console.log((err as HttpErrorResponse).message)
      }
    )

    this.flightService.getEconomyClassSeatsForFlight(this.id).subscribe(
      (res: FlightSeat[])=>{
        this.economyClass = res;
        
      },
      err=>{
        console.log((err as HttpErrorResponse).message);
      }
    )

    this.flightService.getFlight(this.id).subscribe(
      (res:any)=>{
        this.flights.push(res as FlightReceive);
        
      },
      err=>
      {
        console.log((err as HttpErrorResponse).message);
      }
    )


    this.firstClass.forEach(f=>{
      if(f.reserved)
        console.log(f);
    })

  }

  
  checkSeat(seat:FlightSeat){
    //alert("Uncheck seat:" + seat)

    

     if(!this.seatsChecked.includes(seat))
     {
      // console.log(seat.price
      //this.price += seat.Price;
      //console.log(seat)

      this.seatsChecked.push(seat);

      this.price += seat.price;

      //console.log(this.seatsChecked);
    } 
    else
    {
      //console.log("POGRESNOOOOOOO");
      this.price -= seat.price;

      let index = this.seatsChecked.indexOf(seat);
      this.seatsChecked.splice(index,1);
      //console.log(this.seatsChecked.length);
    }
      
  }
  
  inviteFriend(friend: User){
    // console.log(friend);
    this.invitedFriends.push(friend);
    // console.log(this.invitedFriends);
  }

  showFriends(){
    this.inviteClicked = true;
    // console.log(this.invitedFriends);
  }


  makeReservation(){
    if(this.reservationForm.valid && (this.invitedFriends.length === this.seatsChecked.length - 1)){
      console.log(this.reservationForm.value);

      let res: FlightReservation = new FlightReservation();

      res.invitedFriends = new Array<User>();
      res.invitedFriends = this.invitedFriends;
      res.passport = this.reservationForm.controls['passport'].value;
      res.seats = new Array<FlightSeat>();
      res.seats = this.seatsChecked;
      res.flightId = this.id;

      var decode = jwt_decode(localStorage.getItem('token'));
      var UserID = decode['UserID'];

      res.user = UserID;

      console.log(res);


      this.flightService.makeReservation(res).subscribe(
        (response: any)=>{
          console.log(response);


          this.router.navigateByUrl("/mainPage");
        },
        err=>{
          console.log((err as HttpErrorResponse).message);
        }
      )

      if(this.reservationForm.controls['rentCar'].value){
        alert("Ovde rutiranje")
      }
    }else{
      if(this.invitedFriends.length !== (this.seatsChecked.length - 1))
        alert("Check enought seats to match the number of invited friends")
      else
        alert("Please check atleast one seat and enter your passport number.")

        this.seatsChecked = [];
        this.invitedFriends = [];
        this.price = 0;
        this.inviteClicked = false;
    }
  }

  
}
