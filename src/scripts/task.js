/**
 * Creates a task instance.
 *
 * @constructor(description, reference)
 * @param {string} description A text description od the task.
 * @param {object} reference A dom object to reference directly.
 */
export default class Task {
  constructor(description, reference = null) {
    this.index = 0;
    this.description = description;
    this.completed = false;
    this.reference = reference;
  }

  toggleComplete = () => {
    this.completed = !this.completed;
  }

  /**
   * @param {number} newIndex
   */
  set indexNumber(newIndex) {
    this.index = newIndex;
  }
}
