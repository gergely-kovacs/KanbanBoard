import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../task';
import { TaskCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-task-group',
  standalone: true,
  imports: [MatCardModule, CdkDrag, TaskCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- FIXME: remove annoying tooltip that appears on mouseover -->
    <mat-card class="h-full">
      <mat-card-header class="{{ headerClass() }}">
        <mat-card-title class="text-gray-50">{{ title() }}</mat-card-title>
      </mat-card-header>
      <mat-card-content class="!pb-0">
        @for (task of tasks(); track task.id) {
        <app-task-card
          [attr.data-testid]="'task-card-' + task.id"
          class="cursor-move m-4"
          cdkDrag
          [cdkDragData]="task"
          [task]="task"
          (taskMoved)="moveTask($event)"
          (taskDeleted)="deleteTask($event)"
        ></app-task-card>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class TaskGroupComponent {
  headerClass = input.required<string>();
  title = input.required<string>();
  tasks = input.required<Task[]>();

  @Output() taskMoved = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();

  moveTask(task: Task) {
    this.taskMoved.emit(task);
  }

  deleteTask(task: Task) {
    this.taskDeleted.emit(task);
  }
}
