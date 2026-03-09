import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-analog-clock',
  standalone: true,
  template: `<canvas #clockCanvas width="300" height="300"></canvas>`,
  styles: [`
    canvas { 
      display: block; 
      margin: 0 auto; 
      background-color: #f9f9f9; 
      border-radius: 50%;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
  `]
})
export class AnalogClockComponent implements AfterViewInit, OnDestroy {
  @ViewChild('clockCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.timeSub = this.timeService.time$.subscribe(time => {
      this.drawClock(ctx, time, canvas.width, canvas.height);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }

  private drawClock(ctx: CanvasRenderingContext2D, time: Date, width: number, height: number) {
    const radius = height / 2;
    ctx.clearRect(0, 0, width, height); 
    
    ctx.save();
    ctx.translate(radius, radius); 
    
    // 1. Dibujar el fondo del reloj
    ctx.beginPath();
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // 2. DIBUJAR LOS NÚMEROS DE LAS HORAS
    ctx.font = 'bold 20px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    for (let num = 1; num <= 12; num++) {
      const angle = num * Math.PI / 6;
      // Calculamos la posición x e y para cada número usando trigonometría
      const x = Math.cos(angle - Math.PI / 2) * (radius * 0.75);
      const y = Math.sin(angle - Math.PI / 2) * (radius * 0.75);
      ctx.fillText(num.toString(), x, y);
    }

    // 3. Extraer la hora exacta de nuestro TimeService
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    // 4. Calcular los ángulos en radianes
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    second = (second * Math.PI / 30);

    // 5. Dibujar las manecillas
    this.drawHand(ctx, hour, radius * 0.5, 6, '#333');     // Horas
    this.drawHand(ctx, minute, radius * 0.7, 4, '#666');   // Minutos
    this.drawHand(ctx, second, radius * 0.8, 2, 'red');    // Segundos

    // 6. Dibujar el punto central
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.restore();
  }

  private drawHand(ctx: CanvasRenderingContext2D, pos: number, length: number, width: number, color: string) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}