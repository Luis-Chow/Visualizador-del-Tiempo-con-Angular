import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

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

  prefix = '';
  hourText = '';
  minuteText = '';
  secondText = '';

  ngOnInit() {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.updateWords(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private updateWords(time: Date) {
    let h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    h = h % 12;
    if (h === 0) h = 12;

    this.prefix = h === 1 ? 'Es la' : 'Son las';
    
    this.hourText = h === 1 ? 'una' : this.numberToWords(h);
    this.minuteText = this.numberToWords(m);
    this.secondText = this.numberToWords(s);
  }

  private numberToWords(num: number): string {
    if (num === 0) return 'cero';
    
    const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta'];

    if (num < 20) return units[num];
    if (num === 20) return 'veinte';
    if (num < 30) return 'veinti' + units[num - 20];

    const t = Math.floor(num / 10);
    const u = num % 10;
    
    return tens[t] + (u > 0 ? ' y ' + units[u] : '');
  }
}