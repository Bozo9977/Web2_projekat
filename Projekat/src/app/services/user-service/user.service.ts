import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44314/api';

  login(formData){
    return this.http.post(this.BaseURI + '/User/Login', formData);
  } 
  
}
