import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <header>
      <app-header></app-header>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: ``,
})
export class AppComponent {
  title = 'KanbanBoard';
}
