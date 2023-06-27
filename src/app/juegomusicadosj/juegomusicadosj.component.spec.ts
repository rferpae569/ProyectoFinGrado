import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicadosjComponent } from './juegomusicadosj.component';

describe('JuegomusicadosjComponent', () => {
  let component: JuegomusicadosjComponent;
  let fixture: ComponentFixture<JuegomusicadosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicadosjComponent]
    });
    fixture = TestBed.createComponent(JuegomusicadosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
