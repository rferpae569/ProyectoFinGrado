import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eleccion2dosjComponent } from './eleccion2dosj.component';

describe('Eleccion2dosjComponent', () => {
  let component: Eleccion2dosjComponent;
  let fixture: ComponentFixture<Eleccion2dosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Eleccion2dosjComponent]
    });
    fixture = TestBed.createComponent(Eleccion2dosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
