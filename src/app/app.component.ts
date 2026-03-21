import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa el modulo de rutas
  template: `<router-outlet></router-outlet>` // Aqui es donde Angular inyecta las vistas
})
export class AppComponent {}