import { Injectable, inject, signal } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Task } from '../task';
import { TaskBackendService } from './task-backend.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskBackendService = inject(TaskBackendService);
  private readonly notificationService = inject(NotificationService);

  tasks = signal<Task[]>([]);

  async loadTasks(): Promise<Task[] | undefined> {
    try {
      const tasks = await this.taskBackendService.fetchTasks();
      this.tasks.set(tasks);
      return tasks;
    } catch (error) {
      const message = (error as Error).message;
      this.notificationService.showErrorNotification(
        message || 'Failed to load tasks'
      );
      return;
    }
  }

  async addTask(task: Omit<Task, 'id'>): Promise<Task | undefined> {
    try {
      const newTask = await this.taskBackendService.createTask(task);
      this.tasks.update((tasks) => [...tasks, newTask]);
      this.notificationService.showSuccessNotification(
        'Task added successfully'
      );
      return newTask;
    } catch (error) {
      const message = (error as Error).message;
      this.notificationService.showErrorNotification(
        message || 'Failed to add task'
      );
      return;
    }
  }

  // FIXME: It would be nice if tasks retained their ordering when updated
  async updateTask(task: Task): Promise<Task | undefined> {
    try {
      const updatedTask = await this.taskBackendService.updateTask(task);
      this.tasks.update((tasks) =>
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      return updatedTask;
    } catch (error) {
      const message = (error as Error).message;
      this.notificationService.showErrorNotification(
        message || 'Failed to update task'
      );
      return;
    }
  }
}
