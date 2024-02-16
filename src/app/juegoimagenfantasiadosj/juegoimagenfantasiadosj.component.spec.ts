import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenfantasiadosjComponent } from './juegoimagenfantasiadosj.component';

describe('JuegoimagenfantasiadosjComponent', () => {
  let component: JuegoimagenfantasiadosjComponent;
  let fixture: ComponentFixture<JuegoimagenfantasiadosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagenfantasiadosjComponent]
    });
    fixture = TestBed.createComponent(JuegoimagenfantasiadosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
