import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntafantasiadosjComponent } from './juegopreguntafantasiadosj.component';

describe('JuegopreguntafantasiadosjComponent', () => {
  let component: JuegopreguntafantasiadosjComponent;
  let fixture: ComponentFixture<JuegopreguntafantasiadosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntafantasiadosjComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntafantasiadosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
