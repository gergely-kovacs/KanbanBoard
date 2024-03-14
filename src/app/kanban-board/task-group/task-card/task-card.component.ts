import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="dark:!bg-neutral-600 !bg-neutral-100 rounded">
      <mat-card-content class="dark:text-gray-50 text-gray-800 font-medium">
        <div class="flex items-center text-lg">
          {{ task().description }}
        </div>
      </mat-card-content>
      <mat-card-actions>
        <div class="flex justify-between w-full mx-1 mb-1">
          <div class="flex gap-2">
            @if (task().status !== 'todo') {
            <button
              class="!rounded-md !shadow-md !bg-neutral-400 dark:!bg-neutral-200"
              mat-mini-fab
              aria-label="Move to previous status"
              (click)="moveTask('previous')"
            >
              <mat-icon class="!text-gray-900">arrow_left</mat-icon>
            </button>
            } @if (task().status !== 'done') {
            <button
              class="!rounded-md !shadow-md !bg-neutral-400 dark:!bg-neutral-200"
              mat-mini-fab
              aria-label="Move to next status"
              (click)="moveTask('next')"
            >
              <mat-icon class="!text-gray-900">arrow_right</mat-icon>
            </button>
            }
          </div>
          <button
            class="!rounded-md !shadow-md"
            mat-mini-fab
            color="warn"
            aria-label="Delete task"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ``,
})
export class TaskCardComponent {
  task = input.required<Task>();

  @Output() taskMoved = new EventEmitter<Task>();

  moveTask(direction: 'previous' | 'next') {
    const currentTask = this.task();
    switch (direction) {
      case 'previous':
        this.taskMoved.emit({
          ...currentTask,
          status: currentTask.status === 'done' ? 'doing' : 'todo',
        });
        break;

      case 'next':
        this.taskMoved.emit({
          ...currentTask,
          status: currentTask.status === 'todo' ? 'doing' : 'done',
        });
        break;

      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
}
