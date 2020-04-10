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
    path: 'carChange',
    component: CarChangeComponent
  },
  {
    path: 'companyInfo',
    component: CompanyInfoComponent
  },
  {
    path: 'flight_info',
    component: FlightInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
