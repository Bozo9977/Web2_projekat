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
import { CarInfoChangeComponent } from './components/car-info-change/car-info-change.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddBranchOfficeComponent } from './components/add-branch-office/add-branch-office.component';
import { FlightChangeComponent } from './components/flight-change/flight-change.component';
import { ChangeBranchOfficeComponent } from './components/change-branch-office/change-branch-office.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './components/auth/TokenInterceptor';
import { UserService} from 'src/app/services/user-service/user.service';
import { RateACarComponent } from './components/rate-acar/rate-acar.component';
import { RatingComponent } from './components/rating/rating/rating.component';
import { CarServiceViewComponent } from './components/carServiceView/car-service-view/car-service-view.component';
import { AvailableCarsViewComponent } from './components/availableCarsView/available-cars-view/available-cars-view.component';
import { AverageCompanyComponent } from './components/averageCompany/average-company/average-company.component';
import { AverageCarComponent } from './components/averageCar/average-car/average-car.component';
import { BusinessReportComponent } from './components/businessReport/business-report/business-report.component';
import { IncomeReportComponent } from './components/income-report/income-report.component';
import { FlightReservationsComponent } from './components/flight-reservations/flight-reservations/flight-reservations.component';
import { FlightsViewComponent } from './components/availableFlightsView/flights-view/flights-view.component';
import { DiscountCarComponent } from './components/discountCar/discount-car/discount-car.component';
import { DiscountReservationComponent } from './components/discountReservation/discount-reservation/discount-reservation.component';
import { RegistracijaPotvrdaComponent } from './components/registracijaPotvrda/registracija-potvrda/registracija-potvrda.component';
import { FlightQuickReservationsComponent } from './components/flight-quick-reservations/flight-quick-reservations.component';
import { RateFlightComponent } from './components/rateFlight/rate-flight/rate-flight.component';
import { AcceptFlightInvitationComponent } from './components/accept-flight-invitation/accept-flight-invitation.component';

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
    CarInfoChangeComponent,
    AddBranchOfficeComponent,
    FlightChangeComponent,
    ChangeBranchOfficeComponent,
    RateACarComponent,
    RatingComponent,
    CarServiceViewComponent,
    AvailableCarsViewComponent,
    AverageCompanyComponent,
    AverageCarComponent,
    BusinessReportComponent,
    IncomeReportComponent,
    FlightReservationsComponent,
    FlightsViewComponent,
    DiscountCarComponent,
    DiscountReservationComponent,
    RegistracijaPotvrdaComponent,
    FlightQuickReservationsComponent,
    RateFlightComponent,
    AcceptFlightInvitationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    UserService, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
