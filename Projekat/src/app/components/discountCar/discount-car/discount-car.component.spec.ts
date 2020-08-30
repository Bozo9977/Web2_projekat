import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCarComponent } from './discount-car.component';

describe('DiscountCarComponent', () => {
  let component: DiscountCarComponent;
  let fixture: ComponentFixture<DiscountCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
