import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountReservationComponent } from './discount-reservation.component';

describe('DiscountReservationComponent', () => {
  let component: DiscountReservationComponent;
  let fixture: ComponentFixture<DiscountReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
