import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Income } from 'src/app/entities/income/income';

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.css']
})
export class IncomeReportComponent implements OnInit {

  company;
  idCompany: number;
  companyPom: Array<Income>;
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private routerPrim: Router) { 
    this.company = JSON.parse(localStorage.getItem('company'));
    this.idCompany = this.company.id;
  }

  ngOnInit(): void {
    this.getAverage();
  }

  private getAverage(){
    console.log("USAAAAAO FRONT INCOME");
    this.companyService.getIncomeReportForCompany(this.idCompany).subscribe(
      (res: any) => { 
        this.companyPom = res as Array<Income>;
        console.log("LISTA VRACENA", this.companyPom);
      },
      err => {
        console.log(err);
      }
    );
  }
}
