import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenterrorComponent } from './juegoimagenterror.component';

describe('JuegoimagenterrorComponent', () => {
  let component: JuegoimagenterrorComponent;
  let fixture: ComponentFixture<JuegoimagenterrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoimagenterrorComponent]
    });
    fixture = TestBed.createComponent(JuegoimagenterrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
