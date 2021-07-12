class TaskList {
  taskList = [];

  /**
 * Adds to the task list.
 *
 * @param {Task} task an object type of task
 */
  addToList = (task) => {
    this.taskList = this.taskList.concat(task);
    this.showAllTasks();
  }

  /**
 * Removes by index
 *
 * @param {number} index The index of the selected task
 */
  removeFromList = (index) => {
    this.taskList = this.taskList.filter((task) => task.index !== index);
  }

  /**
 * Returns the taskList
 *
 * @return {Array} taskList.
 */
  get getList() {
    return this.taskList;
  }

  /**
 * Returns Task by index
 *
 * @param {number} index The index of the selected Task
 * @return {Task} foundTask.
 */
  getByindex = (index) => {
    const foundTask = this.taskList.find((task) => task.index === index);
    return foundTask;
  }

  showAllTasks = () => {
    this.taskList.forEach((element) => {
      console.log(element);
    });
  }
}

const taskList = new TaskList();
export { taskList as default };