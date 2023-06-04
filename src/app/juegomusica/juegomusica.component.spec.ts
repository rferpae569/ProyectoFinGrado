import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicaComponent } from './juegomusica.component';

describe('JuegomusicaComponent', () => {
  let component: JuegomusicaComponent;
  let fixture: ComponentFixture<JuegomusicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicaComponent]
    });
    fixture = TestBed.createComponent(JuegomusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
