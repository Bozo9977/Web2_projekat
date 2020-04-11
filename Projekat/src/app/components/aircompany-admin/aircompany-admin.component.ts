import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aircompany-admin',
  templateUrl: './aircompany-admin.component.html',
  styleUrls: ['./aircompany-admin.component.css']
})
export class AircompanyAdminComponent implements OnInit {
  destinationClicked: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  newDestinationClicked(){
    this.destinationClicked = !this.destinationClicked;
  }
}
