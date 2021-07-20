/**
 * @jest-environment jsdom
 */
import TaskUtils from '../task-utils.js';
import Task from '../task.js';

const taskUtils = new TaskUtils();

describe('Test add and remove from DOM list display', () => {
  test('Add one new task item to the list', () => {
    // Arrange
    document.body.innerHTML = '<div>'
      + '  <ul class="task-list"></ul>'
      + '</div>';
    const li = document.createElement('li');
    const target = document.querySelector('.task-list');
    const task = new Task('task 1', li, false, 0);

    // Act
    taskUtils.addTaskToDomList(task, target);
    const list = document.querySelectorAll('li');

    // Assert
    expect(list).toHaveLength(1);
  });

  test('Remove one task item from the list', () => {
    // Arrange
    document.body.innerHTML = '<div>'
      + '  <ul class="task-list"></ul>'
      + '</div>';
    const li = document.createElement('li');
    const target = document.querySelector('.task-list');
    const task = new Task('task 1', li, false, 0);

    // Act
    taskUtils.addTaskToDomList(task, target);
    taskUtils.removeFromTaskList(task, target);
    const list = document.querySelectorAll('li');

    // Assert
    expect(list).toHaveLength(0);
  });
});
