import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptFlightInvitationComponent } from './accept-flight-invitation.component';

describe('AcceptFlightInvitationComponent', () => {
  let component: AcceptFlightInvitationComponent;
  let fixture: ComponentFixture<AcceptFlightInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptFlightInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptFlightInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
