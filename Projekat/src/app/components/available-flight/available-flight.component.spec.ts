import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFlightComponent } from './available-flight.component';

describe('AvailableFlightComponent', () => {
  let component: AvailableFlightComponent;
  let fixture: ComponentFixture<AvailableFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
