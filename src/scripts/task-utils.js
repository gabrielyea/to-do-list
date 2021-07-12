import Task from './task.js';
import listeners from './listeners';
import taskList from './task-list.js';

export default class TaskUtils {
  input = document.querySelector('.task-input');

  taskTemplate = document.querySelector('.task-template');

  templateTarget = document.querySelector('.task-list');

  init = () => {
    listeners.onTaskSubmited(this.input,
      { callback: () => taskList.addToList(this.getCurrentTask()) },
      { callback: this.clearTaskList },
      { callback: this.displayTasksList });
  }

  createTaskElement = ({ description }) => {
    const clone = this.taskTemplate.content.firstElementChild.cloneNode(true);
    // const btn = clone.querySelector('.btn');
    clone.querySelector('.task-description').innerText = description;
    // listeners.onClickEvent(btn, { callback: () => console.log("Hello") });
    return clone;
  }

  displayTasksList = () => {
    // this.clearBookList();
    taskList.getList.forEach((task) => {
      this.templateTarget.appendChild(this.createTaskElement(task));
    });
  }

  clearTaskList = () => {
    while (this.templateTarget.lastChild) {
      this.templateTarget.removeChild(this.templateTarget.lastChild);
    }
  }

  getCurrentTask = () => new Task(this.input.value);
}