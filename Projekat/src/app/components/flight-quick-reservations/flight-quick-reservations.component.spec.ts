import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightQuickReservationsComponent } from './flight-quick-reservations.component';

describe('FlightQuickReservationsComponent', () => {
  let component: FlightQuickReservationsComponent;
  let fixture: ComponentFixture<FlightQuickReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightQuickReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightQuickReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
