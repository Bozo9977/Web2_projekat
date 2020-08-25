import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateACarComponent } from './rate-acar.component';

describe('RateACarComponent', () => {
  let component: RateACarComponent;
  let fixture: ComponentFixture<RateACarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateACarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
