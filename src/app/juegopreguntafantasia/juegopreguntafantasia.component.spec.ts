import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntafantasiaComponent } from './juegopreguntafantasia.component';

describe('JuegopreguntafantasiaComponent', () => {
  let component: JuegopreguntafantasiaComponent;
  let fixture: ComponentFixture<JuegopreguntafantasiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntafantasiaComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntafantasiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
