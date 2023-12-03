import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosjugadoresonlineComponent } from './dosjugadoresonline.component';

describe('DosjugadoresonlineComponent', () => {
  let component: DosjugadoresonlineComponent;
  let fixture: ComponentFixture<DosjugadoresonlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosjugadoresonlineComponent]
    });
    fixture = TestBed.createComponent(DosjugadoresonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
