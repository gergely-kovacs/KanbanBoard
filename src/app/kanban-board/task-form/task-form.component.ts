import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { isEmpty, isNil, trim } from 'lodash-es';
import { Task } from '../../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="taskForm" novalidate (ngSubmit)="onSubmit()">
      <mat-card class="form-card">
        <mat-card-header>
          <mat-card-title class="dark:text-gray-200 text-gray-800"
            >Add Task</mat-card-title
          >
        </mat-card-header>
        <mat-card-content class="mt-4">
          <mat-form-field class="w-full">
            <input
              data-testid="description-input"
              matInput
              placeholder="Description"
              formControlName="description"
            />
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions class="!px-4 !pb-4">
          <button
            data-testid="create-button"
            mat-raised-button
            color="primary"
            type="submit"
          >
            Create
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: ``,
})
export class TaskFormComponent {
  private readonly fb = inject(FormBuilder);

  @Output() taskAdded = new EventEmitter<Omit<Task, 'id'>>();

  taskForm = this.fb.group({
    description: [null, Validators.required],
  });

  onSubmit(): void {
    if (
      isNil(this.taskForm.value.description) ||
      isEmpty(trim(this.taskForm.value.description))
    ) {
      return;
    }

    this.taskAdded.emit({
      description: this.taskForm.value.description,
      status: 'todo',
    });

    this.taskForm.reset();
  }
}
