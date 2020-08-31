import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFlightComponent } from './rate-flight.component';

describe('RateFlightComponent', () => {
  let component: RateFlightComponent;
  let fixture: ComponentFixture<RateFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
