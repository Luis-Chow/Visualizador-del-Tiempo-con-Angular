import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que visualiza el tiempo en formato BCD (Binary Coded Decimal)
@Component({
  selector: 'app-binary-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binary-clock.component.html',
  styleUrls: ['./binary-clock.component.css']
})
export class BinaryClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  // Estructura de datos para controlar el estado de cada "led"
  binaryData = {
    hTen: [false, false],
    hUnit: [false, false, false, false],
    mTen: [false, false, false],
    mUnit: [false, false, false, false],
    sTen: [false, false, false],
    sUnit: [false, false, false, false]
  };

  ngOnInit() {
    // Escucha el flujo de tiempo y actualiza los arreglos binarios
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateBinary(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  // Descompone la hora en decenas y unidades para pasarlas a binario
  private updateBinary(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    this.binaryData.hTen = this.toBinaryArray(Math.floor(h / 10), 2);
    this.binaryData.hUnit = this.toBinaryArray(h % 10, 4);
    
    this.binaryData.mTen = this.toBinaryArray(Math.floor(m / 10), 3);
    this.binaryData.mUnit = this.toBinaryArray(m % 10, 4);
    
    this.binaryData.sTen = this.toBinaryArray(Math.floor(s / 10), 3);
    this.binaryData.sUnit = this.toBinaryArray(s % 10, 4);
  }

  // Convierte un numero decimal a un array de booleanos (bits)
  private toBinaryArray(num: number, bits: number): boolean[] {
    const binString = num.toString(2).padStart(bits, '0');
    return binString.split('').map(char => char === '1');
  }
}