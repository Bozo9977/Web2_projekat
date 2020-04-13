import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircompanyServiceComponent } from './aircompany-service.component';

describe('AircompanyServiceComponent', () => {
  let component: AircompanyServiceComponent;
  let fixture: ComponentFixture<AircompanyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircompanyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircompanyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
