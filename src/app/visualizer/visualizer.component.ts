import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { TimeService } from '../core/time.service';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { BinaryClockComponent } from './binary-clock/binary-clock.component';

@Component({
  selector: 'app-visualizer',
  standalone: true,
imports: [CommonModule, AnalogClockComponent, DigitalClockComponent, BinaryClockComponent],
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
  
})
export class VisualizerComponent {
  authService = inject(AuthService);
  public timeService = inject(TimeService);
  router = inject(Router);

  clocks = [
    { id: 'analogico', name: 'Analógico Clásico' },
    { id: 'digital', name: 'Digital Tipográfico' },
    { id: 'binario', name: 'Reloj Binario' }
  ];

  selectedClock = this.clocks[0].id;

  onClockChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedClock = target.value;
  }

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.timeService.setOffsetMinutes(Number(target.value));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}