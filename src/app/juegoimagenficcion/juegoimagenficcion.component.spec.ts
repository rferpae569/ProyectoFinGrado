import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenficcionComponent } from './juegoimagenficcion.component';

describe('JuegoimagenficcionComponent', () => {
  let component: JuegoimagenficcionComponent;
  let fixture: ComponentFixture<JuegoimagenficcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagenficcionComponent]
    });
    fixture = TestBed.createComponent(JuegoimagenficcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
