import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosServiciosComponent } from './terminos-servicios.component';

describe('TerminosServiciosComponent', () => {
  let component: TerminosServiciosComponent;
  let fixture: ComponentFixture<TerminosServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminosServiciosComponent]
    });
    fixture = TestBed.createComponent(TerminosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
