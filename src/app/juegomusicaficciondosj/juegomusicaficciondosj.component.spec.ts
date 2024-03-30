import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicaficciondosjComponent } from './juegomusicaficciondosj.component';

describe('JuegomusicaficciondosjComponent', () => {
  let component: JuegomusicaficciondosjComponent;
  let fixture: ComponentFixture<JuegomusicaficciondosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicaficciondosjComponent]
    });
    fixture = TestBed.createComponent(JuegomusicaficciondosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
