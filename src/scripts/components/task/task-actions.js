import taskList from '../list/task-list.js';
import draggable from '../utils/draggable.js';
import listeners from '../utils/listeners.js';
import ux from '../user-interface/user-interface.js';

/**
 * Utility class, sets all events and callbacks on a task element.
 */
class TaskAction {
  /**
   * Sets all the events tasks listents to.
   *
   ** Registers the callbacks to the events.
   * @param {Task} task Expects a task object filled with data.
   * @param {Function} sortCallback Sorting elements function.
   * @param {Function} saveCallback Saves list data.
   */
  setActions = (task, { sortCallback, saveCallback }) => {
    const pElement = () => task.reference.querySelector('.task-description');

    draggable.makeDraggable(task.reference,
      { callback: () => ux.setDefaultStyle(taskList.getList) },
      { callback: sortCallback },
      { callback: saveCallback });

    listeners.onCheckBoxChange(task.reference.querySelector('.checkbox'),
      { callback: () => task.doAction([ux.setChekedStyle]) },
      { callback: task.toggleComplete },
      { callback: saveCallback });

    listeners.onTextChange(pElement(),
      { callback: () => task.updateDescription(pElement().innerText) },
      { callback: saveCallback });

    listeners.onClickEvent(pElement(),
      { callback: () => ux.setDefaultStyleOfAllButCurrent(taskList.getList, task.reference) },
      { callback: () => task.doAction([ux.toggleEditStyle]) });

    listeners.onClickEvent(task.reference.querySelector('.delete'),
      { callback: () => taskList.removeFromList(task) },
      { callback: sortCallback },
      { callback: saveCallback });
  }
}

const taskActions = new TaskAction();
export { taskActions as default };