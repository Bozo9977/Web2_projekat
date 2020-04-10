import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarChangeComponent } from './car-change.component';

describe('CarChangeComponent', () => {
  let component: CarChangeComponent;
  let fixture: ComponentFixture<CarChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
