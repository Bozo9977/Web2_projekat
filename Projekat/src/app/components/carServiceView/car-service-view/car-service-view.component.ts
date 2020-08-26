import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { CarCompany } from 'src/app/entities/car-company/car-company';

@Component({
  selector: 'app-car-service-view',
  templateUrl: './car-service-view.component.html',
  styleUrls: ['./car-service-view.component.css']
})
export class CarServiceViewComponent implements OnInit {
  carCompanies: Array<CarCompany>;
  constructor(private carService: CompanyService) { }

  ngOnInit(): void {
    this.carService.loadCarCompanies().subscribe(
      (res: any) =>{
        console.log(res);
        this.carCompanies = res as CarCompany[]
      },
      err =>{
        console.log(err);
      }
    )
  }

}
