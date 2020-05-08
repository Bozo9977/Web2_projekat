import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css']
})
export class AddPriceComponent implements OnInit {

  priceForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.priceForm = new FormGroup({
      'priceDay': new FormControl(''),
      'priceHour': new FormControl(''),
    });
  }

  addPrice() {
    console.log(this.priceForm.value);
    console.log(this.priceForm);
  }

}
