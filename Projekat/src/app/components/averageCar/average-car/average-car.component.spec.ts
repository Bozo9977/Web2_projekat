import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCarComponent } from './average-car.component';

describe('AverageCarComponent', () => {
  let component: AverageCarComponent;
  let fixture: ComponentFixture<AverageCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
