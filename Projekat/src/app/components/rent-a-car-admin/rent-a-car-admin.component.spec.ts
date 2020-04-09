import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAdminComponent } from './rent-a-car-admin.component';

describe('RentACarAdminComponent', () => {
  let component: RentACarAdminComponent;
  let fixture: ComponentFixture<RentACarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
