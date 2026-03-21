import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que simula indicadores de un automovil para mostrar el tiempo
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

  // Valores numericos para las etiquetas
  hNum = 0; mNum = 0; sNum = 0;

  // Grados de rotacion para las agujas
  hDeg = 0; mDeg = 0; sDeg = 0;

  ngOnInit() {
    // Escucha el tiempo y calcula los angulos de las agujas
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateTachometers(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  // Mapea el tiempo actual a un circulo de 360 grados
  private updateTachometers(time: Date) {
    this.hNum = time.getHours();
    this.mNum = time.getMinutes();
    this.sNum = time.getSeconds();

    // Calculo: (Valor / Maximo) * 360 grados
    this.hDeg = (this.hNum / 24) * 360;
    this.mDeg = (this.mNum / 60) * 360;
    this.sDeg = (this.sNum / 60) * 360;
  }
}