import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenterrordosjComponent } from './juegoimagenterrordosj.component';

describe('JuegoimagenterrordosjComponent', () => {
  let component: JuegoimagenterrordosjComponent;
  let fixture: ComponentFixture<JuegoimagenterrordosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagenterrordosjComponent]
    });
    fixture = TestBed.createComponent(JuegoimagenterrordosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
