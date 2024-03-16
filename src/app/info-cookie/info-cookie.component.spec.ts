import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCookieComponent } from './info-cookie.component';

describe('InfoCookieComponent', () => {
  let component: InfoCookieComponent;
  let fixture: ComponentFixture<InfoCookieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoCookieComponent]
    });
    fixture = TestBed.createComponent(InfoCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
