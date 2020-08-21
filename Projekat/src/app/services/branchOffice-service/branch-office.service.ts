import { Injectable } from '@angular/core';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";

  loadBranchOffices(){
    return this.mockedBranchOffices();
  }

  updateBranchOffice(branch: BranchOffice){
    
    return this.http.put<BranchOffice>(this.BasURI + '/BranchOffice/UpdateBranchOffice', branch);
    
  }

  getBranchOfficeForCompany(idCompany: number): Observable<BranchOffice[]>{
    
    return this.http.get<BranchOffice[]>(this.BasURI + '/BranchOffice/GetBranchOfficeForCompany/' + idCompany);
    
  }

  getOneBO(id: number){
    return this.http.get<BranchOffice>(this.BasURI + '/BranchOffice/GetBranchOffice/' + id); 
  }

  getAllBO(){
    return this.http.get<BranchOffice[]>(this.BasURI + '/BranchOffice/GetAllBranchOffices');
  }

  searchCompany(formData){
    return this.http.post<BranchOffice[]>(this.BasURI + '/BranchOffice/SearchCompany', formData);
  }

  addBranchOffices(branchOffice: BranchOffice){
    return this.http.post(this.BasURI + '/BranchOffice/AddBranchOffice', branchOffice);
  }

  mockedBranchOffices():Array<BranchOffice>{
    let allComp = new Array<BranchOffice>();

   // const c1 = new BranchOffice('1', 'Bozic trans', 'Novi Sad', 'Bastovanska 24', '444555');
   // const c2 = new BranchOffice('2', 'Bozic trans', 'Beograd', 'Lasla Gala 2', '222333');
   // const c3 = new BranchOffice('3', 'Bozic trans', 'Nis', 'Marka Miljanova 5', '891345');

   // allComp.push(c1);
   // allComp.push(c2);
   // allComp.push(c3);

    return allComp;
  }
}
