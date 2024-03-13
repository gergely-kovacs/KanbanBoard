import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingService } from '../loading.service';
import { ThemingService } from '../theming.service';

type ColorTheme = 'light' | 'dark';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressBarModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Kanban Board</span>

      <span class="flex-auto"></span>

      <div class="flex items-center">
        <mat-icon class="mr-2 text-slate-300">dark_mode</mat-icon>
        <mat-slide-toggle (toggleChange)="toggleTheme()"></mat-slide-toggle>
        <mat-icon class="ml-2 text-amber-300">light_mode</mat-icon>
      </div>
    </mat-toolbar>
    @if (loadingService.isLoading()) {
    <mat-progress-bar color="accent" mode="query"></mat-progress-bar>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly themingService = inject(ThemingService);
  readonly loadingService = inject(LoadingService);

  currentTheme: ColorTheme = 'dark';

  ngOnInit(): void {
    // TODO: load preferred theme from local storage or user settings
    this.themingService.loadStyle('dark');
  }

  toggleTheme() {
    if (this.currentTheme === 'light') {
      this.currentTheme = 'dark';
    } else {
      this.currentTheme = 'light';
    }

    this.themingService.loadStyle(this.currentTheme);
  }
}
