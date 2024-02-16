import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicafantasiadosjComponent } from './juegomusicafantasiadosj.component';

describe('JuegomusicafantasiadosjComponent', () => {
  let component: JuegomusicafantasiadosjComponent;
  let fixture: ComponentFixture<JuegomusicafantasiadosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicafantasiadosjComponent]
    });
    fixture = TestBed.createComponent(JuegomusicafantasiadosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
