import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que transforma el tiempo en un codigo de color hexadecimal
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

  hexColor = '#000000'; // Variable que guarda el color generado
  timeString = '00:00:00'; // Representacion textual del tiempo

  ngOnInit() {
    // Suscripcion al servicio de tiempo para actualizar el color cada segundo
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateHexColor(time);
    });
  }

  ngOnDestroy() {
    // Limpieza de la suscripcion al destruir el componente
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  // Metodo que mapea el tiempo a un formato hexadecimal (#HHMMSS)
  private updateHexColor(time: Date) {
    const h = this.padZero(time.getHours());
    const m = this.padZero(time.getMinutes());
    const s = this.padZero(time.getSeconds());

    this.timeString = `${h}:${m}:${s}`;
    
    // El color se genera concatenando los valores numericos
    this.hexColor = `#${h}${m}${s}`;
  }

  // Asegura que los numeros menores a 10 tengan un cero inicial
  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}