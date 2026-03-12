import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-grid-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-clock.component.html',
  styleUrls: ['./grid-clock.component.css']
})
export class GridClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  hoursGrid = Array.from({ length: 24 }, (_, i) => i);
  minutesGrid = Array.from({ length: 60 }, (_, i) => i);
  secondsGrid = Array.from({ length: 60 }, (_, i) => i);

  currentHour = 0;
  currentMinute = 0;
  currentSecond = 0;

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentHour = time.getHours();
      this.currentMinute = time.getMinutes();
      this.currentSecond = time.getSeconds();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}