import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eleccion2Component } from './eleccion2.component';

describe('Eleccion2Component', () => {
  let component: Eleccion2Component;
  let fixture: ComponentFixture<Eleccion2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Eleccion2Component]
    });
    fixture = TestBed.createComponent(Eleccion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
