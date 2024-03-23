import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenficciondosjComponent } from './juegoimagenficciondosj.component';

describe('JuegoimagenficciondosjComponent', () => {
  let component: JuegoimagenficciondosjComponent;
  let fixture: ComponentFixture<JuegoimagenficciondosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagenficciondosjComponent]
    });
    fixture = TestBed.createComponent(JuegoimagenficciondosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
