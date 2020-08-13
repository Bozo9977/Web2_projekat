import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  readonly BaseURI = "https://localhost:44314/api";

  addUser(formData){
    return this.http.post(this.BaseURI + '/User/Register', formData);
}

  addAircompanyAddmin(formData){
    return this.http.post(this.BaseURI + '/User/RegisterAircompanyAdmin',formData);
  }


}

