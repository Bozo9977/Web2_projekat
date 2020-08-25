import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { RentACarAdminComponent } from './components/rent-a-car-admin/rent-a-car-admin.component';
import { LoggedInUserComponent } from './components/logged-in-user/logged-in-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarChangeComponent } from './components/car-change/car-change.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { AircompanyAdminComponent } from './components/aircompany-admin/aircompany-admin.component';
import { BranchOfficeComponent } from './components/branch-office/branch-office.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { AddPriceComponent } from './components/add-price/add-price.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { RegistrationCompanyComponent } from './components/registration-company/registration-company.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { RentACarServicesComponent } from './components/rent-a-car-services/rent-a-car-services.component';
import { AvailableCarsComponent } from './components/available-cars/available-cars.component';
import { BranchOfficeViewComponent } from './components/branch-office-view/branch-office-view.component';
import { AircompanyServiceComponent } from './components/aircompany-service/aircompany-service.component';
import { AvailableFlightComponent } from './components/available-flight/available-flight.component';
import { DestinationViewComponent } from './components/destination-view/destination-view.component';
import { CarInfoChangeComponent } from './components/car-info-change/car-info-change.component';
import { AddBranchOfficeComponent } from './components/add-branch-office/add-branch-office.component';
import { FlightChangeComponent } from './components/flight-change/flight-change.component';
import { ChangeBranchOfficeComponent } from './components/change-branch-office/change-branch-office.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { RateACarComponent } from './components/rate-acar/rate-acar.component';
import { RatingComponent } from './components/rating/rating/rating.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "rent-a-car-Admin",
    component: RentACarAdminComponent
  },
  {
    path: 'aircompany_admin',
    component: AircompanyAdminComponent
  },
  {
    path: "mainPage",
    component: LoggedInUserComponent
  },
  {
    path: 'userInfo',
    component: UserInfoComponent
  },
  {
    path: 'carsInfo',
    component: CarInfoComponent
  },

  {
    path: 'companyInfo',
    component: CompanyInfoComponent
  },
  {
    path: 'flight_info',
    component: FlightInfoComponent
  },

 // {
  //  path: 'branchOffice',
  //  component: BranchOfficeComponent
 // },

  {
    path: 'priceList-path',
    component: PricelistComponent
  },

  {
    path: 'addPrice',
    component: AddPriceComponent
  },

  {
    path: 'administrator',
    component: AdministratorComponent
  },

  {
    path: 'registration',
    component: RegistrationCompanyComponent
  },

  {
    path: 'addAdmin-path',
    component: AddAdminComponent
  },

  {
    path: 'rentACarServices',
    component: RentACarServicesComponent
  },
  
  {
    path: 'friends',
    component: UserViewComponent
  },

  {
    path: 'branchOfficeView',
    component: BranchOfficeViewComponent
  },

  {
    path: ":id/availableCars",
    component: AvailableCarsComponent
  },

  {
    path: 'aircompanyService',
    component: AircompanyServiceComponent
  },

  {
    path: 'availableFlight',
    component: AvailableFlightComponent
  },

  {
    path: 'destinationView',
    children:[
      {path: "", component: HomepageComponent},
      {path: ":id", component: DestinationViewComponent}
    ]
  },
  {
    path: "carChange",
    children: [
      { path: "", component: CarChangeComponent },
      { path: ":id/carInfoChange", component: CarInfoChangeComponent },
    ]
  },
  {
    path: ":id/flightChange", 
    component: FlightChangeComponent
  },
  {
    path: "add-BranchOffice",
    component: AddBranchOfficeComponent
  },

  {
    path: "branchOffice",
    children: [
      { path: "", component: BranchOfficeComponent },
      { path: ":id/change-BranchOffice", component: ChangeBranchOfficeComponent },
    ]
  },

  {
    path: "rateACar",
    component: RateACarComponent
  },

  {
    path: ":id/rating",
    component: RatingComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
