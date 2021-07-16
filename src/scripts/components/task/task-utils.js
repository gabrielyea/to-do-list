import Task from './task.js';
import listeners from '../utils/listeners.js';
import taskList from '../list/task-list.js';
import localStorage from '../utils/localStorage.js';
import ux from '../user-interface/user-interface.js';
import taskAction from './task-actions.js';

export default class TaskUtils {
  input = document.querySelector('.task-input');

  taskTemplate = document.querySelector('.task-template');

  templateTarget = document.querySelector('.task-list');

  currentTasks = this.templateTarget.getElementsByTagName('li');

  save = () => { localStorage.saveData({ data: taskList.getList }); };

  init = () => {
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

    if (dataList !== null && dataList.length > 0) {
      dataList.forEach(({ description, completed, index }) => {
        taskList.addToList(this.createTaskElement({ description, completed, index }));
      });
    }
    this.appendElementsToList();
  }
}
