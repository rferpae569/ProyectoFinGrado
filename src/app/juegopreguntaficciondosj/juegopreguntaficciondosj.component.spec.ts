import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntaficciondosjComponent } from './juegopreguntaficciondosj.component';

describe('JuegopreguntaficciondosjComponent', () => {
  let component: JuegopreguntaficciondosjComponent;
  let fixture: ComponentFixture<JuegopreguntaficciondosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntaficciondosjComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntaficciondosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
