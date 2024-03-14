import { describe, expect, test } from 'vitest';
import { isInstanceOfTask } from './task';

describe('isInstanceOfTask', () => {
  test('should return true when a task has all fields', () => {
    const task = {
      id: '1',
      description: 'Get to work',
      status: 'todo',
    };

    expect(isInstanceOfTask(task)).toBe(true);
  });

  test('should return false when a task misses status', () => {
    const task = {
      id: '1',
      description: 'Get to work',
    };

    expect(isInstanceOfTask(task)).toBe(false);
  });

  test('should return false when a task misses id', () => {
    const task = {
      description: 'Get to work',
      status: 'todo',
    };

    expect(isInstanceOfTask(task)).toBe(false);
  });

  test('should return false when a task misses description', () => {
    const task = {
      id: '1',
      status: 'todo',
    };

    expect(isInstanceOfTask(task)).toBe(false);
  });

  test('should return false when a task is not an object', () => {
    const task = 'Get to work';

    expect(isInstanceOfTask(task)).toBe(false);
  });

  test('should return false when a task is null', () => {
    const task = null;

    expect(isInstanceOfTask(task)).toBe(false);
  });

  test('should return false when a task is undefined', () => {
    const task = undefined;

    expect(isInstanceOfTask(task)).toBe(false);
  });

  test('should return false if status is not one of todo, doing, done', () => {
    const task = {
      id: '1',
      description: 'Get to work',
      status: 'invalid',
    };

    expect(isInstanceOfTask(task)).toBe(false);
  });
});
