import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeViewComponent } from './branch-office-view.component';

describe('BranchOfficeViewComponent', () => {
  let component: BranchOfficeViewComponent;
  let fixture: ComponentFixture<BranchOfficeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
