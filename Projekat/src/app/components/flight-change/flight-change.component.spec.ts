import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightChangeComponent } from './flight-change.component';

describe('FlightChangeComponent', () => {
  let component: FlightChangeComponent;
  let fixture: ComponentFixture<FlightChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
