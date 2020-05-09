import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { RentACarAdminComponent } from './components/rent-a-car-admin/rent-a-car-admin.component';
import { LoggedInUserComponent } from './components/logged-in-user/logged-in-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarChangeComponent } from './components/car-change/car-change.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { AircompanyAdminComponent } from './components/aircompany-admin/aircompany-admin.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { BranchOfficeComponent } from './components/branch-office/branch-office.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { AddPriceComponent } from './components/add-price/add-price.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { RegistrationCompanyComponent } from './components/registration-company/registration-company.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { RentACarServicesComponent } from './components/rent-a-car-services/rent-a-car-services.component';
import { AvailableCarsComponent } from './components/available-cars/available-cars.component';
import { BranchOfficeViewComponent } from './components/branch-office-view/branch-office-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AircompanyServiceComponent } from './components/aircompany-service/aircompany-service.component';
import { AvailableFlightComponent } from './components/available-flight/available-flight.component';
import { DestinationViewComponent } from './components/destination-view/destination-view.component';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    RentACarAdminComponent,
    LoggedInUserComponent,
    UserInfoComponent,
    CarInfoComponent,
    CarChangeComponent,
    CompanyInfoComponent,
    AircompanyAdminComponent,
    FlightInfoComponent,
    BranchOfficeComponent,
    PricelistComponent,
    AddPriceComponent,
    DestinationsComponent,
    AdministratorComponent,
    RegistrationCompanyComponent,
    AddAdminComponent,
    RentACarServicesComponent,
    AvailableCarsComponent,
    BranchOfficeViewComponent,
    UserViewComponent,
    AircompanyServiceComponent,
    AvailableFlightComponent,
    DestinationViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
