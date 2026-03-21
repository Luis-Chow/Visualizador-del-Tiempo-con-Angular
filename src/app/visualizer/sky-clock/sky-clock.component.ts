import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que anima un paisaje basado en el avance del tiempo
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

  // Variables para la posicion de los objetos (0% a 100%)
  hourPos = 0;
  minutePos = 0;
  secondPos = 0;

  isDaytime = true; // Controla el tema visual (dia/noche)
  exactTime = '';

  ngOnInit() {
    // Suscripcion al motor de tiempo central
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateSky(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  // Actualiza la logica visual del cielo
  private updateSky(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    this.exactTime = `${this.pad(h)}:${this.pad(m)}:${this.pad(s)}`;

    // Define horario de dia entre las 6:00 y las 19:00
    this.isDaytime = h >= 6 && h < 19;

    // Mapeo del tiempo a coordenadas porcentuales
    this.hourPos = (h / 24) * 100;
    this.minutePos = (m / 60) * 100;
    this.secondPos = (s / 60) * 100;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}