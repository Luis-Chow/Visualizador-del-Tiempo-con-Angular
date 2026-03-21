import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que visualiza el tiempo como una matriz de celdas tipo LED
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

  // Arrays estaticos para generar las cuadriculas via *ngFor
  hoursGrid = Array.from({ length: 24 }, (_, i) => i);
  minutesGrid = Array.from({ length: 60 }, (_, i) => i);
  secondsGrid = Array.from({ length: 60 }, (_, i) => i);

  currentHour = 0;
  currentMinute = 0;
  currentSecond = 0;

  ngOnInit() {
    // Escucha los cambios de tiempo y actualiza los contadores locales
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentHour = time.getHours();
      this.currentMinute = time.getMinutes();
      this.currentSecond = time.getSeconds();
    });
  }

  ngOnDestroy() {
    // Evita fugas de memoria al cambiar de reloj
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}