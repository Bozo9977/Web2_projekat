import { Component, OnInit } from '@angular/core';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';
import { CompanyService } from 'src/app/services/company-service/company.service';

@Component({
  selector: 'app-aircompany-service',
  templateUrl: './aircompany-service.component.html',
  styleUrls: ['./aircompany-service.component.css']
})
export class AircompanyServiceComponent implements OnInit {
  airCompanies: Array<Aircompany>;
  loggedIn:boolean = false;

  constructor(private airService: CompanyService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userDetails')!==null)
      this.loggedIn = true;

      console.log()
    this.airService.loadAircompanies().subscribe(
      (res: any) =>{
        console.log(res);
        this.airCompanies = res as Aircompany[]
      },
      err =>{
        console.log(err);
      }
    )
  }

}
