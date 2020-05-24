import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';

@Component({
  selector: 'app-add-branch-office',
  templateUrl: './add-branch-office.component.html',
  styleUrls: ['./add-branch-office.component.css']
})
export class AddBranchOfficeComponent implements OnInit {

  constructor(private branch: BranchOfficeService) { }

  addBranchOfficeForm: FormGroup;
  ngOnInit(): void {
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
    console.log(this.addBranchOfficeForm.value);
    this.branch.addBranchOffices(this.addBranchOfficeForm.value).subscribe(
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
