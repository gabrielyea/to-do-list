import Task from './task.js';
import listeners from './listeners.js';
import taskList from './task-list.js';

export default class TaskUtils {
  input = document.querySelector('.task-input');

  taskTemplate = document.querySelector('.task-template');

  templateTarget = document.querySelector('.task-list');

  currentTasks = this.templateTarget.getElementsByTagName('li');

  init = () => {
    listeners.onTaskSubmited(this.input,
      { callback: () => taskList.addToList(this.createTaskElement({})) },
      { callback: this.clearTaskList },
      { callback: this.appendElementsToList });
  }

  createTaskElement = ({ description = this.input.value }) => {
    const clone = this.taskTemplate.content.firstElementChild.cloneNode(true);
    clone.querySelector('.task-description').innerText = description;
    const task = new Task(this.input.value, clone);
    return task;
  }

  appendElementsToList = () => {
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
    taskList.sortList(true);
    this.appendElementsToList();
  }

  getCurrentTask = () => new Task(this.input.value);
}