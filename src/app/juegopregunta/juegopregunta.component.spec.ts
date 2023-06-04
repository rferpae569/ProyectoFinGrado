import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntaComponent } from './juegopregunta.component';

describe('JuegopreguntaComponent', () => {
  let component: JuegopreguntaComponent;
  let fixture: ComponentFixture<JuegopreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntaComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
