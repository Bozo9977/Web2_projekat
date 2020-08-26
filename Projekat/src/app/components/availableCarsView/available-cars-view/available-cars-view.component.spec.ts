import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCarsViewComponent } from './available-cars-view.component';

describe('AvailableCarsViewComponent', () => {
  let component: AvailableCarsViewComponent;
  let fixture: ComponentFixture<AvailableCarsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableCarsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCarsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
