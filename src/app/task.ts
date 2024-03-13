export interface Task {
  id: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
}
