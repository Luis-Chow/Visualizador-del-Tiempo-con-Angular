import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que traduce el tiempo numerico a una frase legible en español
@Component({
  selector: 'app-word-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-clock.component.html',
  styleUrls: ['./word-clock.component.css']
})
export class WordClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  // Variables para formar la oracion
  prefix = '';      // "Es la" o "Son las"
  hourText = '';    // "una", "dos", etc.
  minuteText = '';  // "diez", "veinticinco", etc.
  secondText = '';  // "cero", "uno", etc.

  ngOnInit() {
    // Se suscribe al flujo de tiempo para actualizar las palabras cada segundo
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateWords(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  // Logica para decidir el genero y numero de la frase
  private updateWords(time: Date) {
    let h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    // Formato de 12 horas para lenguaje natural
    h = h % 12;
    if (h === 0) h = 12;

    // Ajuste de gramatica segun la hora
    this.prefix = h === 1 ? 'Es la' : 'Son las';
    this.hourText = h === 1 ? 'una' : this.numberToWords(h);
    
    this.minuteText = this.numberToWords(m);
    this.secondText = this.numberToWords(s);
  }

  /**
   * @method numberToWords
   * @description Algoritmo para convertir numeros (0-59) a texto en español.
   * Maneja excepciones como numeros del 11 al 19 y la familia de los veintes.
   */
  private numberToWords(num: number): string {
    if (num === 0) return 'cero';
    
    const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta'];

    if (num < 20) return units[num];
    if (num === 20) return 'veinte';
    if (num < 30) return 'veinti' + units[num - 20];

    const t = Math.floor(num / 10);
    const u = num % 10;
    
    return tens[t] + (u > 0 ? ' y ' + units[u] : '');
  }
}