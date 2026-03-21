import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { TimeService } from '../core/time.service';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { BinaryClockComponent } from './binary-clock/binary-clock.component';
import { ProgressClockComponent } from './progress-clock/progress-clock.component';
import { HexClockComponent } from './hex-clock/hex-clock.component';
import { GridClockComponent } from './grid-clock/grid-clock.component';
import { RingClockComponent } from './ring-clock/ring-clock.component';
import { WordClockComponent } from './word-clock/word-clock.component';
import { TachometerClockComponent } from './tachometer-clock/tachometer-clock.component';
import { SkyClockComponent } from './sky-clock/sky-clock.component';
import { TerminalClockComponent } from './terminal-clock/terminal-clock.component';


// Componente principal del visualizador
// Se encarga de la navegacion entre relojes y la gestion del tiempo
@Component({
  selector: 'app-visualizer',
  standalone: true,
imports: [CommonModule, AnalogClockComponent, DigitalClockComponent, BinaryClockComponent, ProgressClockComponent, HexClockComponent, GridClockComponent, RingClockComponent, WordClockComponent, TachometerClockComponent, SkyClockComponent, TerminalClockComponent],
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
  
})
export class VisualizerComponent {
  authService = inject(AuthService);
  public timeService = inject(TimeService);
  router = inject(Router);

  // Catalogo de relojes disponibles para el dropdown
  clocks = [
    { id: 'analogico', name: 'Analógico Clásico' },
    { id: 'digital', name: 'Digital Tipográfico' },
    { id: 'binario', name: 'Reloj Binario' },
    { id: 'barras', name: 'Barras de Progreso' },
    { id: 'hexadecimal', name: 'Reloj Color Hexadecimal' },
    { id: 'cuadricula', name: 'Matriz de Cuadrículas' },
    { id: 'anillos', name: 'Anillos Concéntricos' },
    { id: 'palabras', name: 'Reloj de Palabras' },
    { id: 'tacometro', name: 'Tablero de Tacómetros' },
    { id: 'Dia/Noche', name: 'Dia / Noche' },
    { id: 'terminal', name: 'Terminal de Comandos (CLI)' }
  ];

  // Estado que controla cual reloj se renderiza (por defecto el primero)
  selectedClock = this.clocks[0].id;

  // Cambia el id del reloj seleccionado segun el dropdown
  onClockChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedClock = target.value;
  }

  // Notifica al servicio de tiempo cuando el slider se mueve
  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.timeService.setOffsetMinutes(Number(target.value));
  }

  // Borra sesion y redirige a la pantalla de entrada
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}