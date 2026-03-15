import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-terminal-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-clock.component.html',
  styleUrls: ['./terminal-clock.component.css']
})
export class TerminalClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  currentTime: Date = new Date();
  unixTime: number = 0;

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentTime = time;
      this.unixTime = time.getTime(); 
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}