import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegospoilerComponent } from './juegospoiler.component';

describe('JuegospoilerComponent', () => {
  let component: JuegospoilerComponent;
  let fixture: ComponentFixture<JuegospoilerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegospoilerComponent]
    });
    fixture = TestBed.createComponent(JuegospoilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
