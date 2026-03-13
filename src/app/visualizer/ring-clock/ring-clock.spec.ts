import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingClock } from './ring-clock';

describe('RingClock', () => {
  let component: RingClock;
  let fixture: ComponentFixture<RingClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RingClock],
    }).compileComponents();

    fixture = TestBed.createComponent(RingClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
