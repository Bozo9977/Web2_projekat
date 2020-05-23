import { Injectable } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsServiceService {

  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";

  loadCars(){
    return this.mockedCars();
  }

  addCar(formData){
      return this.http.post(this.BasURI + '/CarCompany/AddCar', formData);
  }

  deleteCar(id: number): Observable<{}>{
    return this.http.delete(this.BasURI + '/CarCompany/DeleteCar/'+id);
  }

  getCars(): Observable<Cars[]>{
    return this.http.get<Cars[]>(this.BasURI + '/CarCompany/GetCars');
  }

  mockedCars():Array<Cars>{
    let allComp = new Array<Cars>();

    //const c1 = new Cars("assets/images/audi.jpg" ,1, 5544, 'Audi A4', 2010, 'Disel', 'Manual', 5, 4, 'Yes', 2, 1200, 500);
   // const c2 = new Cars("assets/images/bmw.jpg" ,2, 5545, 'Bmw', 2015, 'Disel', 'Automatic', 5, 5, 'Yes', 4, 1500, 700);
    //const c3 = new Cars("assets/images/megan.jpg" ,3, 5546, 'Megan', 2012, 'Disel', 'Manual', 5, 5, 'Yes', 3, 1000, 300);

    //allComp.push(c1);
    //allComp.push(c2);
    //allComp.push(c3);

    return allComp;
  }


}
