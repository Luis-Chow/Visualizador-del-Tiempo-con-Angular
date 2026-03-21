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
  // Referencia directa al elemento canvas del DOM
  @ViewChild('clockCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  timeService = inject(TimeService);
  private timeSub?: Subscription;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d'); // Contexto de dibujo 2D
    if (!ctx) return;

    // Se suscribe al motor de tiempo para redibujar el canvas en cada tick
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.drawClock(ctx, time, canvas.width, canvas.height);
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe(); // Limpieza para evitar fugas de memoria
  }

  // Funcion principal de renderizado grafico
  private drawClock(ctx: CanvasRenderingContext2D, time: Date, width: number, height: number) {
    const radius = height / 2;
    ctx.clearRect(0, 0, width, height); // Limpia el frame anterior
    
    ctx.save();
    ctx.translate(radius, radius); // Mueve el punto (0,0) al centro del reloj
    
    // Dibujo del circulo base
    ctx.beginPath();
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Renderizado de numeros usando trigonometria (Seno y Coseno)
    ctx.font = 'bold 20px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    for (let num = 1; num <= 12; num++) {
      const angle = num * Math.PI / 6;
      const x = Math.cos(angle - Math.PI / 2) * (radius * 0.75);
      const y = Math.sin(angle - Math.PI / 2) * (radius * 0.75);
      ctx.fillText(num.toString(), x, y);
    }

    // Conversion de tiempo a radianes para rotar las manecillas
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    second = (second * Math.PI / 30);

    // Dibuja cada manecilla con su respectiva longitud y color
    this.drawHand(ctx, hour, radius * 0.5, 6, '#333');     // Horas
    this.drawHand(ctx, minute, radius * 0.7, 4, '#666');   // Minutos
    this.drawHand(ctx, second, radius * 0.8, 2, 'red');    // Segundos

    // Boton central decorativo
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.restore();
  }

  // Metodo auxiliar para dibujar lineas rotadas segun la posicion del tiempo
  private drawHand(ctx: CanvasRenderingContext2D, pos: number, length: number, width: number, color: string) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos); // Resetea la rotacion para la siguiente manecilla
  }
}