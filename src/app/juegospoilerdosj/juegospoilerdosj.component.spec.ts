import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegospoilerdosjComponent } from './juegospoilerdosj.component';

describe('JuegospoilerdosjComponent', () => {
  let component: JuegospoilerdosjComponent;
  let fixture: ComponentFixture<JuegospoilerdosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegospoilerdosjComponent]
    });
    fixture = TestBed.createComponent(JuegospoilerdosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
