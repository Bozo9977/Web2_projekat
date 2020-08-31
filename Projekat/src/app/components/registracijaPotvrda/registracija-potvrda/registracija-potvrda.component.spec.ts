import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaPotvrdaComponent } from './registracija-potvrda.component';

describe('RegistracijaPotvrdaComponent', () => {
  let component: RegistracijaPotvrdaComponent;
  let fixture: ComponentFixture<RegistracijaPotvrdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistracijaPotvrdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaPotvrdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
