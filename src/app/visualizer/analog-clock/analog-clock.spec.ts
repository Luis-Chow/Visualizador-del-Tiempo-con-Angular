import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogClock } from './analog-clock';

describe('AnalogClock', () => {
  let component: AnalogClock;
  let fixture: ComponentFixture<AnalogClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalogClock],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalogClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
