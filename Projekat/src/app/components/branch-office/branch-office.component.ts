import { Component, OnInit } from '@angular/core';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.css']
})
export class BranchOfficeComponent implements OnInit {

  branchOffices: Array<BranchOffice>;
  constructor(private offices: BranchOfficeService) { }

  ngOnInit(): void {
    this.loadBranchOffices();
    console.log(this.branchOffices);
  }

  private loadBranchOffices(){
    this.offices.getBranchOffice().subscribe(
      (res: any) => { 
        this.branchOffices = res as BranchOffice[] 
      },
      err => {
        console.log(err);
      }
    );
  } 
  
}
