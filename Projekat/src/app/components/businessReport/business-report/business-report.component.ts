import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { BusinessReport } from 'src/app/entities/businessReport/business-report';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.css']
})
export class BusinessReportComponent implements OnInit {

  company;
  idCompany: number;
  companyPom: Array<BusinessReport>;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private routerPrim: Router) { 

    this.company = JSON.parse(localStorage.getItem('company'));
    this.idCompany = this.company.id;

  }

  ngOnInit(): void {

    this.getAverage();
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
