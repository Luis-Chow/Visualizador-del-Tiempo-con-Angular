import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalClock } from './terminal-clock';

describe('TerminalClock', () => {
  let component: TerminalClock;
  let fixture: ComponentFixture<TerminalClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalClock],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
