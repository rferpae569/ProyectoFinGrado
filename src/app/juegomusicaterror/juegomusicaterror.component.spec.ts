import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicaterrorComponent } from './juegomusicaterror.component';

describe('JuegomusicaterrorComponent', () => {
  let component: JuegomusicaterrorComponent;
  let fixture: ComponentFixture<JuegomusicaterrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicaterrorComponent]
    });
    fixture = TestBed.createComponent(JuegomusicaterrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
