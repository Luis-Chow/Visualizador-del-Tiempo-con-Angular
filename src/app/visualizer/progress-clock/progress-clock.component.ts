import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que visualiza el tiempo como barras de carga horizontales
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

  // Variables para mostrar el numero exacto en las etiquetas
  hours = 0;
  minutes = 0;
  seconds = 0;

  // Variables para el ancho de las barras (0 a 100)
  hPercent = 0;
  mPercent = 0;
  sPercent = 0;

  ngOnInit() {
    // Suscripcion al flujo de tiempo para recalcular el progreso cada segundo
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateProgress(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  // Realiza el calculo matematico de los porcentajes
  private updateProgress(time: Date) {
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();

    // Regla de tres: (valor actual / valor maximo) * 100
    this.hPercent = (this.hours / 24) * 100;
    this.mPercent = (this.minutes / 60) * 100;
    this.sPercent = (this.seconds / 60) * 100;
  }
}