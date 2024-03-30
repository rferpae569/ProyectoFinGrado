import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicaficcionComponent } from './juegomusicaficcion.component';

describe('JuegomusicaficcionComponent', () => {
  let component: JuegomusicaficcionComponent;
  let fixture: ComponentFixture<JuegomusicaficcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicaficcionComponent]
    });
    fixture = TestBed.createComponent(JuegomusicaficcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
