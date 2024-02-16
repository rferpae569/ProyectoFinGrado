import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopreguntaterrorComponent } from './juegopreguntaterror.component';

describe('JuegopreguntaterrorComponent', () => {
  let component: JuegopreguntaterrorComponent;
  let fixture: ComponentFixture<JuegopreguntaterrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegopreguntaterrorComponent]
    });
    fixture = TestBed.createComponent(JuegopreguntaterrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
