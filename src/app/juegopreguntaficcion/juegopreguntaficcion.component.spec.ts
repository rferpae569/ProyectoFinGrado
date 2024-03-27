import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntaficcionComponent } from './juegopreguntaficcion.component';

describe('JuegopreguntaficcionComponent', () => {
  let component: JuegopreguntaficcionComponent;
  let fixture: ComponentFixture<JuegopreguntaficcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntaficcionComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntaficcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
