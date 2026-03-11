import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressClock } from './progress-clock';

describe('ProgressClock', () => {
  let component: ProgressClock;
  let fixture: ComponentFixture<ProgressClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressClock],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
