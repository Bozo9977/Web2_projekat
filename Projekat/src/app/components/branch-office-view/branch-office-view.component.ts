import { Component, OnInit } from '@angular/core';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';

@Component({
  selector: 'app-branch-office-view',
  templateUrl: './branch-office-view.component.html',
  styleUrls: ['./branch-office-view.component.css']
})
export class BranchOfficeViewComponent implements OnInit {
  branchOffices: Array<BranchOffice>;
  constructor(private offices: BranchOfficeService) { }

  ngOnInit(): void {
    this.branchOffices = this.offices.loadBranchOffices();
    console.log(this.branchOffices);
  }

}
