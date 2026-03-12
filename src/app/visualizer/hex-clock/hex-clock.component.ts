import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-hex-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hex-clock.component.html',
  styleUrls: ['./hex-clock.component.css']
})
export class HexClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  hexColor = '#000000';
  timeString = '00:00:00';

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateHexColor(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private updateHexColor(time: Date) {
    const h = this.padZero(time.getHours());
    const m = this.padZero(time.getMinutes());
    const s = this.padZero(time.getSeconds());

    this.timeString = `${h}:${m}:${s}`;
    
    this.hexColor = `#${h}${m}${s}`;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}