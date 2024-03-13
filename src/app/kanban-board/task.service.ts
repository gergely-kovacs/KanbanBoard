import { Injectable, inject, signal } from '@angular/core';
import { Task } from '../task';
import { TaskBackendService } from './task-backend.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskBackendService = inject(TaskBackendService);
  private readonly notificationService = inject(NotificationService);

  tasks = signal<Task[]>([]);

  async loadTasks() {
    try {
      const tasks = await this.taskBackendService.fetchTasks();
      this.tasks.set(tasks);
    } catch (error) {
      const message = (error as Error).message;
      this.notificationService.showErrorNotification(
        message || 'Failed to load tasks'
      );
    }
  }

  async addTask(task: Omit<Task, 'id'>) {
    try {
      const newTask = await this.taskBackendService.createTask(task);
      this.tasks.update((tasks) => [...tasks, newTask]);
      this.notificationService.showSuccessNotification(
        'Task added successfully'
      );
    } catch (error) {
      const message = (error as Error).message;
      this.notificationService.showErrorNotification(
        message || 'Failed to add task'
      );
    }
  }
}
