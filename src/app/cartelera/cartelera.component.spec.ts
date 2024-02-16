import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoclubComponent } from './cartelera.component';

describe('VideoclubComponent', () => {
  let component: VideoclubComponent;
  let fixture: ComponentFixture<VideoclubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoclubComponent]
    });
    fixture = TestBed.createComponent(VideoclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
