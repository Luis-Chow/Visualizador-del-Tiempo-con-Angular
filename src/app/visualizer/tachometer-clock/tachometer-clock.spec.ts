import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachometerClock } from './tachometer-clock';

describe('TachometerClock', () => {
  let component: TachometerClock;
  let fixture: ComponentFixture<TachometerClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachometerClock],
    }).compileComponents();

    fixture = TestBed.createComponent(TachometerClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
