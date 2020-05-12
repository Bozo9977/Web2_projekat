import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInfoChangeComponent } from './car-info-change.component';

describe('CarInfoChangeComponent', () => {
  let component: CarInfoChangeComponent;
  let fixture: ComponentFixture<CarInfoChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInfoChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInfoChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
