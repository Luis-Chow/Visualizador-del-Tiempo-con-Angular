import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que simula una interfaz de linea de comandos (CLI) de Linux
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
  unixTime: number = 0; // Tiempo en formato Unix (milisegundos desde 1970)

  ngOnInit() {
    // Suscripcion al flujo de tiempo global
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentTime = time;
      this.unixTime = time.getTime(); // Extrae el timestamp numerico
    });
  }

  ngOnDestroy() {
    // Limpieza de suscripcion
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}