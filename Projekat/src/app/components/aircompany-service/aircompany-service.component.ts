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
  
  constructor(private airService: CompanyService) { }

  ngOnInit(): void {
    this.airCompanies = this.airService.loadAircompanies();
  }

}
