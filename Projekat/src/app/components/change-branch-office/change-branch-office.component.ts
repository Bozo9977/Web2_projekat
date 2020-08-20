import { Component, OnInit } from '@angular/core';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-branch-office',
  templateUrl: './change-branch-office.component.html',
  styleUrls: ['./change-branch-office.component.css']
})
export class ChangeBranchOfficeComponent implements OnInit {

  changeBranchOfficeForm: FormGroup;
  sendBranchOffice: BranchOffice;
  branchPom: BranchOffice;
  id: number;

  constructor(private branch: BranchOfficeService, private route: ActivatedRoute, private routerPrim: Router) { 
    route.params.subscribe(params => { this.id = params['id']; });
    console.log(this.id);
    this.loadBranchOffice();
  }

  ngOnInit(): void {
    
    this.initForm();

  }

  private initForm() {
    this.changeBranchOfficeForm = new FormGroup({
      'name': new FormControl(''),
      'city': new FormControl(''),
      'address': new FormControl(''),
      'telephone': new FormControl(''),
    });
  }

  onBranchOffice() {

    this.branchPom = this.changeBranchOfficeForm.value;
    console.log(this.branchPom);
    this.sendBranchOffice = this.changeBranchOfficeForm.value;
    this.sendBranchOffice.id = this.id;
    

    
    this.branch.updateBranchOffice(this.sendBranchOffice).subscribe(
      (res: any) => {
        console.log(res);
        
      },
      err =>{
        console.log(err);
      }
    );
    this.changeBranchOfficeForm.reset();
  }

  private loadBranchOffice(){
    this.branch.getOneBO(this.id).subscribe(
      (res: any) => { 
        this.branchPom = res as BranchOffice
        console.log(this.branchPom);
        this.changeBranchOfficeForm.setValue({name: this.branchPom.name, address: this.branchPom.address, city: this.branchPom.city, telephone: this.branchPom.telephone});
      },
      err => {
        console.log(err);
      }
    );
  } 

}
