import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBranchOfficeComponent } from './change-branch-office.component';

describe('ChangeBranchOfficeComponent', () => {
  let component: ChangeBranchOfficeComponent;
  let fixture: ComponentFixture<ChangeBranchOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBranchOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBranchOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
