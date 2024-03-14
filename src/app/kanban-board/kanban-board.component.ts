import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { isBoolean, isNil } from 'lodash';
import { Task } from '../task';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskGroupComponent } from './task-group/task-group.component';
import { TaskService } from './task.service';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CdkDropList,
    MatDialogModule,
    TaskGroupComponent,
    TaskFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-4 gap-4 m-4">
      <!-- TODO: adjust classes or remove the 'list' class from each -->
      <app-task-group
        class="list"
        data-status="todo"
        headerClass="bg-red-600 rounded-t"
        title="To Do"
        cdkDropList
        #todoList="cdkDropList"
        [tasks]="todo()"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doingList, doneList]"
        (cdkDropListDropped)="drop($event)"
        (taskMoved)="taskMoved($event)"
        (taskDeleted)="taskDeleted($event)"
      ></app-task-group>
      <app-task-group
        class="list"
        data-status="doing"
        headerClass="bg-yellow-600 rounded-t"
        title="Implementing"
        cdkDropList
        #doingList="cdkDropList"
        [tasks]="doing()"
        [cdkDropListData]="doing"
        [cdkDropListConnectedTo]="[todoList, doneList]"
        (cdkDropListDropped)="drop($event)"
        (taskMoved)="taskMoved($event)"
        (taskDeleted)="taskDeleted($event)"
      ></app-task-group>
      <app-task-group
        class="list"
        data-status="done"
        headerClass="bg-green-600 rounded-t"
        title="Done"
        cdkDropList
        #doneList="cdkDropList"
        [tasks]="done()"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList, doingList]"
        (cdkDropListDropped)="drop($event)"
        (taskMoved)="taskMoved($event)"
        (taskDeleted)="taskDeleted($event)"
      ></app-task-group>
      <app-task-form (taskAdded)="taskService.addTask($event)"></app-task-form>
    </div>
  `,
  styles: ``,
})
export class KanbanBoardComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  readonly taskService = inject(TaskService);

  todo = computed(() => {
    return this.taskService.tasks().filter((task) => task.status === 'todo');
  });
  doing = computed(() => {
    return this.taskService.tasks().filter((task) => task.status === 'doing');
  });
  done = computed(() => {
    return this.taskService.tasks().filter((task) => task.status === 'done');
  });

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  async drop(event: CdkDragDrop<Signal<Task[]>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data(),
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    transferArrayItem(
      event.previousContainer.data(),
      event.container.data(),
      event.previousIndex,
      event.currentIndex
    );

    // FIXME: treat the dataset as unknown, make sure it errors on wrong values
    const task: Task = {
      ...event.item.data,
      status: event.container.element.nativeElement.dataset['status'] as
        | 'todo'
        | 'doing'
        | 'done',
    };
    const updatedTask = await this.taskService.updateTask(task);

    if (isNil(updatedTask)) {
      transferArrayItem(
        event.container.data(),
        event.previousContainer.data(),
        event.currentIndex,
        event.previousIndex
      );
    }
  }

  taskMoved(task: Task) {
    this.taskService.updateTask(task);
  }

  taskDeleted(task: Task) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        task,
      }
    });

    dialogRef.afterClosed().subscribe((isConfirmed: unknown) => {
      if (isNil(isConfirmed)) {
        return;
      }

      if (!isBoolean(isConfirmed)) {
        throw new Error("Expected 'isConfirmed' to be a boolean");
      }

      if (isConfirmed) {
        this.taskService.deleteTask(task);
      }
    });
  }
}
