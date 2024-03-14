import { isNil, isObject } from 'lodash';

export interface Task {
  id: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
}

export function isInstanceOfTask(obj: unknown): obj is Task {
  return (
    !isNil(obj) &&
    isObject(obj) &&
    'id' in obj &&
    'description' in obj &&
    'status' in obj
  );
}
