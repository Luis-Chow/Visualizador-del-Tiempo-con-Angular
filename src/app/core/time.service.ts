import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Servicio para emitir la hora a toda la app
@Injectable({
  providedIn: 'root'
})
export class TimeService {
  // BehaviorSubject guarda el ultimo valor de la hora para nuevos suscriptores
  private timeSubject = new BehaviorSubject<Date>(new Date());
  
  // Observable publico para que los relojes se enganchen
  public time$ = this.timeSubject.asObservable(); 
  
  private offsetMilliseconds = 0; // Desfase de tiempo controlado por el slider

  constructor() {
    // Solo corre en el navegador, actualiza cada 1 seg
    if (typeof window !== 'undefined') {
      setInterval(() => {
        const now = new Date();
        // Aplica el offset antes de emitir la nueva hora
        now.setTime(now.getTime() + this.offsetMilliseconds);
        this.timeSubject.next(now);
      }, 1000);
    }
  }

  // Cambia el tiempo de la app segun los minutos del slider
  setOffsetMinutes(minutes: number) {
    this.offsetMilliseconds = minutes * 60 * 1000;
    
    // Emite el cambio de inmediato para que no se note lag en la UI
    const immediateTime = new Date(new Date().getTime() + this.offsetMilliseconds);
    this.timeSubject.next(immediateTime);
  }
}