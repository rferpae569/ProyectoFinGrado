import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntaterrordosjComponent } from './juegopreguntaterrordosj.component';

describe('JuegopreguntaterrordosjComponent', () => {
  let component: JuegopreguntaterrordosjComponent;
  let fixture: ComponentFixture<JuegopreguntaterrordosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntaterrordosjComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntaterrordosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
