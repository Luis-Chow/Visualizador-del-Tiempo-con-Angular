import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-progress-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-clock.component.html',
  styleUrls: ['./progress-clock.component.css']
})
export class ProgressClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  // Variables para guardar el número exacto
  hours = 0;
  minutes = 0;
  seconds = 0;

  // Variables para guardar el porcentaje de llenado (0 a 100)
  hPercent = 0;
  mPercent = 0;
  sPercent = 0;

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateProgress(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private updateProgress(time: Date) {
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();

    // Calculamos los porcentajes (Horas sobre 24, Minutos y Segundos sobre 60)
    this.hPercent = (this.hours / 24) * 100;
    this.mPercent = (this.minutes / 60) * 100;
    this.sPercent = (this.seconds / 60) * 100;
  }
}