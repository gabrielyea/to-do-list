/**
 * @jest-environment jsdom
 */
import Task from '../task.js';
import taskList from '../../list/task-list.js';

describe('Task creation', () => {
  test('Create a new task', () => {
    const task = new Task('task 1', 'reference', false, 0);

    expect(task.info).toEqual({
      description: 'task 1',
      reference: 'reference',
      completed: false,
      index: 0,
    });
  });
});

describe('Add and remove functions', () => {
  test('Add a new task to the list', () => {
    const task = new Task('task 1', 'reference', false, 0);
    taskList.addToList(task);

    expect(taskList.getList.length).toBe(1);
  });

  test('Remove a task with index 0 from  the list', () => {
    const task = new Task('task 1', 'reference', false, 0);
    taskList.removeFromList(task);

    expect(taskList.getList.length).toBe(0);
  });
});

describe('Test task internal functions', () => {
  test('Update task description', () => {
    const task = new Task('task 1', 'reference', false, 0);

    task.updateDescription('test description');

    const { description } = task.info;
    expect(description).toEqual('test description');
  });

  test('Toggle completed', () => {
    const task = new Task('task 1', 'reference', false, 0);

    task.toggleComplete();

    expect(task.completed).toEqual(true);
  });

  test('Update index', () => {
    const task = new Task('task 1', 'reference', false, 0);

    task.updateIndex(1);

    expect(task.index).toBe(1);
  });
});
