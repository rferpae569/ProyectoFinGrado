import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicaterrordosjComponent } from './juegomusicaterrordosj.component';

describe('JuegomusicaterrordosjComponent', () => {
  let component: JuegomusicaterrordosjComponent;
  let fixture: ComponentFixture<JuegomusicaterrordosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicaterrordosjComponent]
    });
    fixture = TestBed.createComponent(JuegomusicaterrordosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
