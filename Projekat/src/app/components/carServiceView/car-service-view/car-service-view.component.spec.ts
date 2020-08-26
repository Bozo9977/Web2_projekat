import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarServiceViewComponent } from './car-service-view.component';

describe('CarServiceViewComponent', () => {
  let component: CarServiceViewComponent;
  let fixture: ComponentFixture<CarServiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarServiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarServiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
