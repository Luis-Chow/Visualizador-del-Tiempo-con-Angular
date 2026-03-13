import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-tachometer-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tachometer-clock.component.html',
  styleUrls: ['./tachometer-clock.component.css']
})
export class TachometerClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  hNum = 0;
  mNum = 0;
  sNum = 0;

  hDeg = 0;
  mDeg = 0;
  sDeg = 0;

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateTachometers(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private updateTachometers(time: Date) {
    this.hNum = time.getHours();
    this.mNum = time.getMinutes();
    this.sNum = time.getSeconds();

    this.hDeg = (this.hNum / 24) * 360;
    this.mDeg = (this.mNum / 60) * 360;
    this.sDeg = (this.sNum / 60) * 360;
  }
}