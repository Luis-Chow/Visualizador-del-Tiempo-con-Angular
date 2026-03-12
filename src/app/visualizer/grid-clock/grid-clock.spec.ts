import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClock } from './grid-clock';

describe('GridClock', () => {
  let component: GridClock;
  let fixture: ComponentFixture<GridClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridClock],
    }).compileComponents();

    fixture = TestBed.createComponent(GridClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
