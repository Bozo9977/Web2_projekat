import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { BusinessReport } from 'src/app/entities/businessReport/business-report';
import { FlightService } from 'src/app/services/flight-service/flight.service';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.css']
})
export class BusinessReportComponent implements OnInit {

  company;
  idCompany: number;
  companyPom: Array<BusinessReport>;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private routerPrim: Router, private flightService: FlightService) { 

    this.company = JSON.parse(localStorage.getItem('company'));
    this.idCompany = this.company.id;

  }

  ngOnInit(): void {
    var role = localStorage.getItem('userType');
    
    if(role === "AirlineAdministrator"){
      this.flightService.getBusinessReport(this.idCompany).subscribe(
        (res: any)=>{
          this.companyPom = res as Array<BusinessReport>;
        },
        err =>{
          console.log(err);
        }
      )
    }else{
      this.getAverage();
    }
  }

  private getAverage(){
    console.log("USAAAAAO FRONT");
    this.companyService.getBusinessAverageForCompany(this.idCompany).subscribe(
      (res: any) => { 
        this.companyPom = res as Array<BusinessReport>;
        console.log("LISTA VRACENA", this.companyPom);
      },
      err => {
        console.log(err);
      }
    );
  }

}
