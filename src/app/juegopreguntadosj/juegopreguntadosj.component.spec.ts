import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntadosjComponent } from './juegopreguntadosj.component';

describe('JuegopreguntadosjComponent', () => {
  let component: JuegopreguntadosjComponent;
  let fixture: ComponentFixture<JuegopreguntadosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntadosjComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntadosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
