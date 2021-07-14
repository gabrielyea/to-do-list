class TaskList {
  taskList = [];

  /**
 * Adds to the task list.
 *
 * @param {li} task an object type of task
 */
  addToList = (task) => {
    this.taskList = this.taskList.concat(task);
  }

  /**
 * Removes by index
 *
 * @param {number} index The index of the selected task
 */
  removeFromList = ({ index }) => {
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

  sortList = (reverse = true) => {
    let mod = 1;
    if (reverse) {
      mod *= -1;
    }
    const byIndex = (a, b) => {
      if (a.index > b.index) {
        return 1 * mod;
      }
      return -1 * mod;
    };

    this.taskList.sort((byIndex));
  }

  /**
   * Finds the html element task object in the list.
   *
   ** Searches by element.reference.
   * @param {HTMLElement} searchThis A html object.
   * @returns {Task} task object associated with the html element.
   */
  findElement = (searchThis) => {
    const found = this.taskList.find((element) => element.reference === searchThis);
    return found;
  }
}

const taskList = new TaskList();
export { taskList as default };