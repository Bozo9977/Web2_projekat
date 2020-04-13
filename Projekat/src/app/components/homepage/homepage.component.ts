import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  rentACarClicked: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

newRentACarClicked(){
    this.rentACarClicked = !this.rentACarClicked;
  }

}
