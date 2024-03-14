import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { isNil, isObject } from 'lodash';
import { Task, isInstanceOfTask } from '../../task';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    <h2 mat-dialog-title>Delete task</h2>
    <mat-dialog-content>
      <div>Are you sure you want to delete the followign task?</div>
      <div class="italic mt-2">
        {{ task?.description }}
      </div>
    </mat-dialog-content>
    <mat-dialog-actions class="!px-4">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>
        Ok
      </button>
    </mat-dialog-actions>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  data = inject<unknown>(MAT_DIALOG_DATA);

  task: Task | null = null;

  constructor() {
    if (isNil(this.data)) {
      throw new Error('Data was not provided to the confirmation dialogue');
    }
    if (!isObject(this.data) || !('task' in this.data)) {
      throw new Error(
        'The data provided to the confirmation dialogue has incorrect structure',
      );
    }
    if (!isInstanceOfTask(this.data.task)) {
      throw new Error(
        'The task passed to the confirmation dialogue is not an instance of Task',
      );
    }
    this.task = this.data.task;
  }
}
