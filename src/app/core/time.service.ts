import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private timeSubject = new BehaviorSubject<Date>(new Date());
  
  public time$ = this.timeSubject.asObservable(); 
  
  private offsetMilliseconds = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      setInterval(() => {
        const now = new Date();
        now.setTime(now.getTime() + this.offsetMilliseconds);
        this.timeSubject.next(now);
      }, 1000);
    }
  }

  setOffsetMinutes(minutes: number) {
    this.offsetMilliseconds = minutes * 60 * 1000;
    
    const immediateTime = new Date(new Date().getTime() + this.offsetMilliseconds);
    this.timeSubject.next(immediateTime);
  }
}