import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCompanyComponent } from './average-company.component';

describe('AverageCompanyComponent', () => {
  let component: AverageCompanyComponent;
  let fixture: ComponentFixture<AverageCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
