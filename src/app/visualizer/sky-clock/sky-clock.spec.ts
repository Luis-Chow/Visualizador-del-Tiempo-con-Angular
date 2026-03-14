import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyClock } from './sky-clock';

describe('SkyClock', () => {
  let component: SkyClock;
  let fixture: ComponentFixture<SkyClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkyClock],
    }).compileComponents();

    fixture = TestBed.createComponent(SkyClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
