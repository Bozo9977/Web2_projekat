import { Injectable } from '@angular/core';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  constructor() { }

  loadBranchOffices(){
    return this.mockedBranchOffices();
  }


  mockedBranchOffices():Array<BranchOffice>{
    let allComp = new Array<BranchOffice>();

    const c1 = new BranchOffice(1, 'Bozic trans', 'Novi Sad', 'Bastovanska 24', 444555);
    const c2 = new BranchOffice(2, 'Bozic trans', 'Beograd', 'Lasla Gala 2', 222333);
    const c3 = new BranchOffice(3, 'Bozic trans', 'Nis', 'Marka Miljanova 5', 891345);

    allComp.push(c1);
    allComp.push(c2);
    allComp.push(c3);

    return allComp;
  }
}
