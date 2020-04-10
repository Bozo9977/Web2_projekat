import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircompanyAdminComponent } from './aircompany-admin.component';

describe('AircompanyAdminComponent', () => {
  let component: AircompanyAdminComponent;
  let fixture: ComponentFixture<AircompanyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircompanyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
