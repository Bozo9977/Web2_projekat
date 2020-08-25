import { Component, OnInit} from '@angular/core';
import { Destination } from 'src/app/entities/destination/destination';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  
  destinations: Array<Destination>;
  destinationForm: FormGroup;
  
  constructor(private destService: DestinationServiceService) {
    
  }

  ngOnInit(): void {
    this.loadDests();
    this.initForm();
  }

  private initForm(){
    this.destinationForm = new FormGroup({
      'city': new FormControl('', Validators.required),
      'Aircompany': new FormControl()
    });    
  }

  private loadDests(){

      var company = JSON.parse(localStorage.getItem('company'));
      this.destService.getDestinationsForCompany(company.id).subscribe(
        (res: any) => { 
          this.destinations = res as Destination[] 
        },
        err => {
          console.log(err);
        }
      );

    
  }

  deleteDest(id:number){
    console.log(id);
    this.destService.deleteDestination(id).subscribe();
    this.loadDests();
  }

  destSubmit(){
    console.log(this.destinationForm.value);
    if(!this.destinationForm.valid){
      alert("Must enter city name")
    }
    else
    {
      var company = JSON.parse(localStorage.getItem('company'));

      this.destinationForm.patchValue({'Aircompany': company.id})

      this.destService.addDestination(this.destinationForm.value).subscribe(
        (res: any) => {
          console.log(res);
          
        },
        err =>{
          console.log(err);
        }
      );
    }
    
    this.destinationForm.reset();
    this.ngOnInit()
  }

}
