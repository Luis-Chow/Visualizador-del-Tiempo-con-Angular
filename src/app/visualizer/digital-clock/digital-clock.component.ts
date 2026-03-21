import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

// Componente que muestra la hora en formato digital clasico con fecha completa
@Component({
  selector: 'app-digital-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit, OnDestroy {
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  currentTime: Date = new Date();

  ngOnInit() {
    // Escucha el observable de tiempo y actualiza la variable de clase
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentTime = time;
    });
  }

  ngOnDestroy() {
    // Cancela la suscripcion al destruir el componente para liberar memoria
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}