import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegomusicafantasiaComponent } from './juegomusicafantasia.component';

describe('JuegomusicafantasiaComponent', () => {
  let component: JuegomusicafantasiaComponent;
  let fixture: ComponentFixture<JuegomusicafantasiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegomusicafantasiaComponent]
    });
    fixture = TestBed.createComponent(JuegomusicafantasiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
