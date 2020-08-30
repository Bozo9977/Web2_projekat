import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { CompanyService } from 'src/app/services/company-service/company.service';
/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})

export class CompanyInfoComponent implements OnInit, AfterViewInit {

////////////////google mape

@ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 45.254410;
    lng = 19.842550;

    

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 8
    };

    marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    ngAfterViewInit() {
      
      this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);
    }
   



private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.coordinates = new google.maps.LatLng(this.lat, this.lng);
      //this.zoom = 15;
    });
  }
}


////////////////////



  companyInfoForm: FormGroup;
  loggedInUser : User;
  user;
  companyPom: CarCompany;
  submitted = false;
  company: CarCompany;
  
  
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.setCurrentLocation();

    this.user = JSON.parse(localStorage.getItem('userDetails'));

    this.companyService.getCarCompanyForUser(this.user.id).subscribe(
      (res: any) =>{
        console.log(res);
        this.company = res as CarCompany
        console.log("VRACENA KOMPANIJA: ", this.company);
        this.companyInfoForm.setValue({ name: this.company.name, address: this.company.address, description: this.company.description});
      },
      err =>{
        console.log(err);
      }
    )

   
    console.log(this.company);
    this.initForm();
  }


  private initForm() {
    this.companyInfoForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
    //this.companyInfoForm.patchValue(this.company);
    
  }

  get f() { return this.companyInfoForm.controls; }

  changeCompany() {

    
  this.submitted = true;

  if (this.companyInfoForm.invalid) {
      return;
  }

    console.log("IZMENA: ", this.companyInfoForm.value);

    
    this.companyPom = this.companyInfoForm.value;
    this.companyPom.id = this.company.id;
    

    this.companyService.updateCompanyService(this.companyPom).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.submitted = false;
    this.companyInfoForm.reset();
  }

}
