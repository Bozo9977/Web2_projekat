import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';

@Component({
  selector: 'app-add-branch-office',
  templateUrl: './add-branch-office.component.html',
  styleUrls: ['./add-branch-office.component.css']
})
export class AddBranchOfficeComponent implements OnInit {

  constructor(private branch: BranchOfficeService) { }

  company;
  addBranchOfficeForm: FormGroup;
  idCompany: number;
  branchOfficeToSend: BranchOffice;

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'));
    this.idCompany = this.company.id;
    this.initForm();
    console.log(this.addBranchOfficeForm.value);
    
  }

  private initForm() {
    this.addBranchOfficeForm = new FormGroup({
      'name': new FormControl(''),
      'city': new FormControl(''),
      'address': new FormControl(''),
      'telephone': new FormControl(''),
    });
  }

  onBranchOffice() {
    this.branchOfficeToSend = this.addBranchOfficeForm.value;
    this.branchOfficeToSend.idCompany = this.idCompany;
    console.log(this.branchOfficeToSend);
    this.branch.addBranchOffices(this.branchOfficeToSend).subscribe(
      (res: any) => {
        console.log(res);
        
      },
      err =>{
        console.log(err);
      }
    );
    this.addBranchOfficeForm.reset();
  }

}
