import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenfantasiaComponent } from './juegoimagenfantasia.component';

describe('JuegoimagenfantasiaComponent', () => {
  let component: JuegoimagenfantasiaComponent;
  let fixture: ComponentFixture<JuegoimagenfantasiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagenfantasiaComponent]
    });
    fixture = TestBed.createComponent(JuegoimagenfantasiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
