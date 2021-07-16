import taskList from '../list/task-list.js';
import draggable from '../utils/draggable.js';
import ux from '../user-interface/user-interface.js';
import CustomListener from '../utils/customListener.js';

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

    // Create all listeners for events
    const onCheckBox = new CustomListener('change', task.reference.querySelector('.checkbox'));
    const onDelete = new CustomListener('click', task.reference.querySelector('.delete'));
    const onEdit = new CustomListener('click', pElement());

    // Add callbacks to onUpdateAction
    task.onUpdateData.addActions(sortCallback, saveCallback);
    // Create a new method to invoke actions.
    Object.getPrototypeOf(task).invokeActions = () => {
      task.onUpdateData.doActions({});
    };

    draggable.makeDraggable(task.reference,
      { callback: () => ux.setDefaultStyle(taskList.getList) },
      { callback: task.invokeActions });

    onCheckBox.addActions(() => ux.setChekedStyle(task.reference),
      task.toggleComplete, saveCallback);

    onEdit.addActions(() => task.updateDescription(pElement().innerText),
      () => ux.setDefaultStyleOfAllButCurrent(taskList.getList, task.reference),
      () => ux.toggleEditStyle(task.reference),
      saveCallback);

    onDelete.addActions(() => taskList.removeFromList(task), task.invokeActions);
  }
}

const taskActions = new TaskAction();
export { taskActions as default };