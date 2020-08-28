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
  
  lugg: Luggage;

  company: Aircompany;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'));
    this.luggages = new Array<Luggage>();
    this.initForm();
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
      'id': new FormControl(''),
      'idCompany': new FormControl()
    });
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
      
      var company = JSON.parse(localStorage.getItem('company'));

      //this.baggageForm.controls['idCompany'].setValue(company.id);

      this.baggageForm.patchValue({'idCompany': company.id});

      console.log(this.baggageForm.value);

     // var lugg: Luggage = new Luggage(this.baggageForm.value);
     this.lugg=this.baggageForm.value;
      console.log(this.lugg);

    

      this.companyService.addLuggage(this.lugg).subscribe(
        (res:any)=>{
          console.log(res);
        },
        err=>{
          alert((err as HttpErrorResponse).message);
        }
      )


    }else{
      alert("You must enter all the fields correctly");
    }
  }

  deleteLugg(Id:number){
    alert(Id);
  }
}
