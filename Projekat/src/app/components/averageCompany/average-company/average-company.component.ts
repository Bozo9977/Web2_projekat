import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { CarCompany } from 'src/app/entities/car-company/car-company';

@Component({
  selector: 'app-average-company',
  templateUrl: './average-company.component.html',
  styleUrls: ['./average-company.component.css']
})
export class AverageCompanyComponent implements OnInit {

  company;
  idCompany: number;
  companyPom: Array<CarCompany>;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private routerPrim: Router) { 
    this.company = JSON.parse(localStorage.getItem('company'));
    this.idCompany = this.company.id;
  }


  ngOnInit(): void {
    this.getAverage();
  }

  private getAverage(){
    this.companyService.getAverageForCompany(this.idCompany).subscribe(
      (res: any) => { 
        this.companyPom = res as Array<CarCompany>;
        console.log(this.companyPom);
      },
      err => {
        console.log(err);
      }
    );
  }
}
