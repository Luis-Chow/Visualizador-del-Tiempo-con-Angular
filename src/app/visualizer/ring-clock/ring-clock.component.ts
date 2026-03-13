import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-ring-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ring-clock.component.html',
  styleUrls: ['./ring-clock.component.css']
})
export class RingClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  timeString = '00:00:00';

  cHour = 2 * Math.PI * 80; 
  cMinute = 2 * Math.PI * 60; 
  cSecond = 2 * Math.PI * 40;

  hOffset = this.cHour;
  mOffset = this.cMinute;
  sOffset = this.cSecond;

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateRings(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private updateRings(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    this.timeString = `${this.pad(h)}:${this.pad(m)}:${this.pad(s)}`;

    this.hOffset = this.cHour - ((h / 24) * this.cHour);
    this.mOffset = this.cMinute - ((m / 60) * this.cMinute);
    this.sOffset = this.cSecond - ((s / 60) * this.cSecond);
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}