import taskList from '../../list/task-list.js';
import LocalStorage from '../../utils/localStorage.js';
import Task from '../task.js';

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

  it('Should only remove completed tasks', () => {
    const localStorage = new LocalStorage();
    const task1 = new Task('desc 1', 'ref 1', true, 0);
    const task2 = new Task('desc 2', 'ref 2', false, 0);
    const task3 = new Task('desc 3', 'ref 3', true, 0);
    localStorage.saveData(task1);
    localStorage.saveData(task2);
    localStorage.saveData(task3);

    let list = localStorage.loadInputData();

    list = taskList.removeAllSelectedFromList(list);
    expect(list.length).toBe(1);
  });

  it('Should save 2 objects', () => {
    const localStorage = new LocalStorage();
    const task1 = new Task('desc 1', 'ref 1', true, 0);
    const task2 = new Task('desc 2', 'ref 2', false, 0);
    localStorage.saveData(task1);
    localStorage.saveData(task2);

    let list = localStorage.loadInputData();

    expect(list.length).toBe(2);
  });
});
