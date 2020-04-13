import { Component, OnInit } from '@angular/core';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { CompanyService } from 'src/app/services/company-service/company.service';

@Component({
  selector: 'app-rent-a-car-services',
  templateUrl: './rent-a-car-services.component.html',
  styleUrls: ['./rent-a-car-services.component.css']
})
export class RentACarServicesComponent implements OnInit {

  carCompanies: Array<CarCompany>;

  constructor(private carService: CompanyService) { }



  ngOnInit(): void {
    this.carCompanies = this.carService.loadCarCompanies();
  }



}
