import Task from './task.js';
import listeners from '../utils/listeners.js';
import taskList from '../list/task-list.js';
import LocalStorage from '../utils/localStorage.js';
import ux from '../user-interface/user-interface.js';
import taskAction from './task-actions.js';

const storage = new LocalStorage();

export default class TaskUtils {
  input;

  taskTemplate;

  templateTarget;

  currentTasks;

  save = () => { storage.saveData({ data: taskList.getList }); };

  load = () => { storage.loadInputData(); };

  init = () => {
    this.input = document.querySelector('.task-input');

    this.taskTemplate = document.querySelector('.task-template');

    this.templateTarget = document.querySelector('.task-list');

    this.currentTasks = this.templateTarget.getElementsByTagName('li');

    listeners.onTaskSubmited(this.input,
      { callback: () => ux.setDefaultStyle(taskList.getList) },
      { callback: () => taskList.addToList(this.createTaskElement({})) },
      { callback: this.appendElementsToList },
      { callback: () => this.save() },
      { callback: ux.clearInputField });

    this.setLoadedData();
    ux.clearBtn.addEventListener('click', () => {
      taskList.removeAllSelected();
      this.save();
      this.sortTaskList();
    });
  }

  /**
   * Creates a Task object
   *
   ** Function is called from Listeners -> onTaskSubmited.
   ** Registers the task on: draggable, onCheckBoxChange, onTextChange.
   * @param {string} description Use for testing.
   * @returns {Task} a filled task.
   */
  createTaskElement = ({ description = this.input.value, completed }) => {
    const clone = this.taskTemplate.content.firstElementChild.cloneNode(true);
    ux.setValuesOfTaskElement(clone, { description, completed });

    const task = new Task(description, clone, completed);
    taskAction.setActions(task, { sortCallback: this.sortTaskList, saveCallback: this.save });

    return task;
  }

  /**
   * Appends all availible tasks on the template target.
   *
   ** Also assigns indexes based on current position.
   */
  appendElementsToList = () => {
    this.clearTaskList();
    taskList.getList.forEach((task) => {
      this.addTaskToDomList(task, this.templateTarget);
    });
  }

  clearTaskList = () => {
    while (this.templateTarget.lastChild) {
      this.templateTarget.removeChild(this.templateTarget.lastChild);
    }
  }

  sortTaskList = () => {
    taskList.sortList(false);
    this.appendElementsToList();
  }

  setLoadedData = () => {
    const dataList = storage.loadInputData();

    if (dataList !== null && dataList.length > 0) {
      dataList.forEach(({ description, completed, index }) => {
        taskList.addToList(this.createTaskElement({ description, completed, index }));
      });
    }
    this.appendElementsToList();
  }

  addItem = ({ task }) => {
    taskList.addToList((task));
  }

  addTaskToDomList = (task, target) => {
    target.appendChild(task.reference);
    task.indexNumber = (Array.from(target.getElementsByTagName('li')).indexOf(task.reference));
  }

  removeFromTaskList = (task, target) => {
    target.removeChild(task.reference);
  }
}
