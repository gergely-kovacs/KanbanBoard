import { Injectable, inject } from '@angular/core';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { LoadingService } from '../loading.service';
import { Task } from '../task';

const taskSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.enum(['todo', 'doing', 'done']),
});

const tasksSchema = z.array(taskSchema);

@Injectable({
  providedIn: 'root',
})
export class TaskBackendService {
  private readonly loadingService = inject(LoadingService);
  private readonly MOCK_SERVER_RESONPOSE_TIME_MS = 500;
  private readonly INITIAL_MOCK_TASKS = [
    {
      id: '1',
      description: 'Get to work',
      status: 'todo',
    },
    {
      id: '2',
      description: 'Pick up groceries',
      status: 'todo',
    },
    {
      id: '3',
      description: 'Go home',
      status: 'todo',
    },
    {
      id: '4',
      description: 'Fall asleep',
      status: 'todo',
    },
    {
      id: '5',
      description: 'Get up',
      status: 'doing',
    },
    {
      id: '6',
      description: 'Brush teeth',
      status: 'doing',
    },
    {
      id: '7',
      description: 'Take a shower',
      status: 'done',
    },
    {
      id: '8',
      description: 'Check e-mail',
      status: 'done',
    },
    {
      id: '9',
      description: 'Walk dog',
      status: 'done',
    },
  ];

  fetchTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.loadingService.show();

      setTimeout(() => {
        try {
          resolve(tasksSchema.parse(this.INITIAL_MOCK_TASKS));
        } catch (error) {
          reject(error);
        } finally {
          this.loadingService.hide();
        }
      }, this.MOCK_SERVER_RESONPOSE_TIME_MS * 3);
    });
  }

  createTask(task: Omit<Task, 'id'>): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.loadingService.show();

      setTimeout(() => {
        try {
          resolve(
            taskSchema.parse({
              id: nanoid(),
              ...task,
            }),
          );
        } catch (error) {
          reject(error);
        } finally {
          this.loadingService.hide();
        }
      }, this.MOCK_SERVER_RESONPOSE_TIME_MS);
    });
  }

  updateTask(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.loadingService.show();

      setTimeout(() => {
        try {
          resolve(taskSchema.parse(task));
        } catch (error) {
          reject(error);
        } finally {
          this.loadingService.hide();
        }
      }, this.MOCK_SERVER_RESONPOSE_TIME_MS);
    });
  }

  deleteTask(task: Task): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      this.loadingService.show();

      setTimeout(() => {
        try {
          resolve(task.id);
        } catch (error) {
          reject(error);
        } finally {
          this.loadingService.hide();
        }
      }, this.MOCK_SERVER_RESONPOSE_TIME_MS);
    });
  }
}
