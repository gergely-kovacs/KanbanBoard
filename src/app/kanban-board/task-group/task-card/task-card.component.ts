import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CdkDrag, CdkDropList, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="dark:!bg-neutral-600 !bg-neutral-100 rounded">
      <mat-card-header>
        <!-- TODO: Add buttons to change task status, and to delete them -->
      </mat-card-header>
      <mat-card-content class="dark:text-gray-50 text-gray-800 font-medium">
        {{ task().description }}
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class TaskCardComponent {
  task = input.required<Task>();
}
