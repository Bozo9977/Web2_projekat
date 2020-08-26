import { Component, OnInit } from '@angular/core';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-branch-office-view',
  templateUrl: './branch-office-view.component.html',
  styleUrls: ['./branch-office-view.component.css']
})
export class BranchOfficeViewComponent implements OnInit {
  branchOffices: Array<BranchOffice>;
  id: number;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router, private branch: BranchOfficeService) {
    route.params.subscribe(params => { this.id = params['id']; });
    console.log(this.id);
   }

  ngOnInit(): void {

    this.loadBranchOffices();
    //console.log(this.branchOffices);
  }

  
  private loadBranchOffices(){
    this.branch.getBranchOfficeForCompany(this.id).subscribe(
      (res: any) => { 
        this.branchOffices = res as BranchOffice[]
        console.log(this.branchOffices);
      },
      err => {
        console.log(err);
      }
    );
  } 

}
