import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Luggage } from 'src/app/entities/luggage/luggage';

@Component({
  selector: 'app-aircompany-admin',
  templateUrl: './aircompany-admin.component.html',
  styleUrls: ['./aircompany-admin.component.css']
})
export class AircompanyAdminComponent implements OnInit {
  destinationClicked: boolean = false;
  flightClicked: boolean = true;
  flightsClicked: boolean = true;
  baggageClicked: boolean = false;
  baggageForm: FormGroup;
  luggages: Luggage[];
  luggageButton: string;
  
  lugg: Luggage;

  company: Aircompany;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.luggageButton = "Add luggage"
    this.company = JSON.parse(localStorage.getItem('company'));
    this.luggages = new Array<Luggage>();
    
    this.initForm();

    var company = JSON.parse(localStorage.getItem('company'));
    this.companyService.getLuggageInfo(company.id).subscribe(
      (res:Luggage[])=>
      {
        this.luggages=res;
        console.log(this.luggages);
      },
      err=>{
        alert((err as HttpErrorResponse).error);
      }
    )
  }
  
  newDestinationClicked(){
    this.destinationClicked = !this.destinationClicked;
    if(!this.flightClicked)
      this.flightClicked = !this.flightClicked;
    if(!this.flightsClicked)
    this.flightsClicked = !this.flightsClicked;
    if(this.baggageClicked)
     this.baggageClicked=!this.baggageClicked;
  }

  initForm(){
    this.baggageForm = new FormGroup({
      'carryOnPrice': new FormControl(null,Validators.required),
      'duffelPrice': new FormControl(null,Validators.required),
      // 'id': new FormControl(''),
      'idCompany': new FormControl()
    });
    var company = JSON.parse(localStorage.getItem('company'));
    this.baggageForm.patchValue({'idCompany':company.id});
  }

  newFlightClicked(){
    this.flightClicked = !this.flightClicked;
    if(this.destinationClicked)
      this.destinationClicked = !this.destinationClicked;
    if(!this.flightsClicked)
      this.flightsClicked = !this.flightsClicked;
      if(this.baggageClicked)
     this.baggageClicked=!this.baggageClicked;
  }
  getAllFlights(){
    this.flightsClicked = !this.flightsClicked;
    if(this.destinationClicked)
      this.destinationClicked = !this.destinationClicked;
    if(!this.flightClicked)
      this.flightClicked = !this.flightClicked;
      if(this.baggageClicked)
     this.baggageClicked=!this.baggageClicked;
  }

  showBaggageInfo(){
  this.baggageClicked=true;
  if(this.destinationClicked)
      this.destinationClicked = !this.destinationClicked;
  if(!this.flightClicked)
    this.flightClicked = !this.flightClicked;
  if(!this.flightsClicked)
    this.flightsClicked = !this.flightsClicked;
  }

  baggageSubmit(){
    if(this.baggageForm.valid){
      
      

    if(this.luggageButton!="Change" && this.luggages.length === 0){

      this.companyService.addLuggage(this.baggageForm.value).subscribe(

        (res:any)=>{
          console.log(res);
        },
        err=>{
          alert((err as HttpErrorResponse).error);
        }
      )
    }else{
      this.companyService.changeLuggage(this.baggageForm.value).subscribe(
        (res:any)=>{
          alert("Luggage info changed!")
        },
        err=>
        {
          alert((err as HttpErrorResponse).error);
        }
      )
    }

    this.baggageForm.reset();
    this.baggageClicked=false;

    }else{
      alert("You must enter all the fields correctly");
    }
  }

  changeLugg(id: number){
    //alert(id);
    this.baggageForm.patchValue(this.luggages[0]);
    this.luggageButton="Change";
  }
}
