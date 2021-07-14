import Task from './task.js';
import listeners from './listeners.js';
import taskList from './task-list.js';
import draggable from './draggable.js';
import localStorage from './localStorage.js';
import ux from './user-interface.js';

export default class TaskUtils {
  input = document.querySelector('.task-input');

  taskTemplate = document.querySelector('.task-template');

  templateTarget = document.querySelector('.task-list');

  currentTasks = this.templateTarget.getElementsByTagName('li');

  init = () => {
    listeners.onTaskSubmited(this.input,
      { callback: () => taskList.addToList(this.createTaskElement({})) },
      { callback: this.appendElementsToList },
      { callback: () => localStorage.saveData({ data: taskList.getList }) },
      { callback: ux.clearInputField });
    this.setLoadedData();
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

    const save = () => { localStorage.saveData({ data: taskList.getList }); };
    const pElement = () => clone.querySelector('.task-description');

    draggable.makeDraggable(task.reference,
      { callback: this.sortTaskList },
      { callback: save });

    listeners.onCheckBoxChange(clone.querySelector('.checkbox'),
      { callback: task.toggleComplete },
      { callback: save });

    listeners.onTextChange(pElement(),
      { callback: () => task.updateDescription(pElement().innerText) },
      { callback: save });

    listeners.onFocusEnterExit(pElement(),
      { optionsEnter: [{ callback: () => ux.toggleHide(task.reference.getElementsByClassName('icon')) }] },
      { optionsExit: [{ callback: () => ux.toggleHide(task.reference.getElementsByClassName('icon')) }] });

    return task;
  }

  appendElementsToList = () => {
    this.clearTaskList();
    taskList.getList.forEach((task) => {
      this.templateTarget.appendChild(task.reference);
      task.indexNumber = (Array.from(this.currentTasks).indexOf(task.reference));
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
    const dataList = localStorage.loadInputData();

    if (!dataList) {
      taskList.addToList(this.createTaskElement({ description: 'Clean the house' }));
      taskList.addToList(this.createTaskElement({ description: 'Walk the dog' }));
      taskList.addToList(this.createTaskElement({ description: 'Make lunch' }));
    } else {
      dataList.forEach(({ description, completed, index }) => {
        taskList.addToList(this.createTaskElement({ description, completed, index }));
      });
    }
    this.appendElementsToList();
  }
}
