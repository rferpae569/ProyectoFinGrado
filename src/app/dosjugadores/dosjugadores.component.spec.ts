import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosjugadoresComponent } from './dosjugadores.component';

describe('DosjugadoresComponent', () => {
  let component: DosjugadoresComponent;
  let fixture: ComponentFixture<DosjugadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosjugadoresComponent]
    });
    fixture = TestBed.createComponent(DosjugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
