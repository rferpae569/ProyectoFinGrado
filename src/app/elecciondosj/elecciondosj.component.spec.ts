import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElecciondosjComponent } from './elecciondosj.component';

describe('ElecciondosjComponent', () => {
  let component: ElecciondosjComponent;
  let fixture: ComponentFixture<ElecciondosjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElecciondosjComponent]
    });
    fixture = TestBed.createComponent(ElecciondosjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
