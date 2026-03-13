import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordClock } from './word-clock';

describe('WordClock', () => {
  let component: WordClock;
  let fixture: ComponentFixture<WordClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordClock],
    }).compileComponents();

    fixture = TestBed.createComponent(WordClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
