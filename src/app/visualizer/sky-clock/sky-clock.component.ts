import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-sky-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sky-clock.component.html',
  styleUrls: ['./sky-clock.component.css']
})
export class SkyClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  hourPos = 0;
  minutePos = 0;
  secondPos = 0;

  isDaytime = true;
  exactTime = '';

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateSky(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private updateSky(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    this.exactTime = `${this.pad(h)}:${this.pad(m)}:${this.pad(s)}`;

    this.isDaytime = h >= 6 && h < 19;

    this.hourPos = (h / 24) * 100;
    this.minutePos = (m / 60) * 100;
    this.secondPos = (s / 60) * 100;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}