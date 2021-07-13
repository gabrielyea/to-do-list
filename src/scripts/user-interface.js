import listeners from './listeners.js';
import TaskUtils from './task-utils.js';

const task = new TaskUtils();

export default class UserInterface {
  clearBtn = document.querySelector('.clear-btn');

  init = () => {
    listeners.onClickEvent(this.clearBtn, { callback: task.sortTaskList });
  }
}