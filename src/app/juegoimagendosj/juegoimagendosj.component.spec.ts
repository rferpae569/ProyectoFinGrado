import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagendosjComponent } from './juegoimagendosj.component';

describe('JuegoimagendosjComponent', () => {
  let component: JuegoimagendosjComponent;
  let fixture: ComponentFixture<JuegoimagendosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagendosjComponent]
    });
    fixture = TestBed.createComponent(JuegoimagendosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
