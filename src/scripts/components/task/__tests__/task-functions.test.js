/**
 * @jest-environment jsdom
 */
import Task from '../task.js';
import taskList from '../../list/task-list.js';
import LocalStorage from '../../utils/localStorage.js';

jest.mock('../../utils/localStorage.js');

describe('Local storage mock operations', () => {
  beforeAll(() => {
    LocalStorage.mockImplementation(() => ({
      localData: [],
      loadInputData() {
        return this.localData;
      },
      saveData(data) {
        this.localData.push(data);
      },
    }));
  });
  it('loadInputData length should be greater than 1', () => {
    const localStorage = new LocalStorage();
    localStorage.saveData('object 1');
    expect(localStorage.loadInputData().length).toBe(1);
  });
});

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
