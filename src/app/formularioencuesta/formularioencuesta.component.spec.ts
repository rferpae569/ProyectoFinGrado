import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioencuestaComponent } from './formularioencuesta.component';

describe('FormularioencuestaComponent', () => {
  let component: FormularioencuestaComponent;
  let fixture: ComponentFixture<FormularioencuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioencuestaComponent]
    });
    fixture = TestBed.createComponent(FormularioencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
