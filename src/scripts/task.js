/**
 * Creates a task instance.
 *
 * @constructor(description, reference)
 * @param {string} description A text description od the task.
 * @param {object} reference A dom object to reference directly.
 */
export default class Task {
  constructor(description, reference = null, completed = false, index = 0) {
    this.index = index;
    this.description = description;
    this.completed = completed;
    this.reference = reference;
  }

  toggleComplete = () => {
    this.completed = !this.completed;
  }

  updateDescription = (desc) => {
    this.description = desc;
  }

  /**
   * Recives a function callback. Callback process task's reference data.
   *
   ** Used for interface functions.
   ** Can be used for any class as long as it is expecting an HTMLElement.
   * @param {function} callback function expecting a HTMLElement
   */
  doAction = (callbacks) => {
    callbacks.forEach((callback) => {
      callback(this.reference);
    });
  }

  set setDescription(desc) {
    this.description = desc;
  }

  /**
   * @param {number} newIndex
   */
  set indexNumber(newIndex) {
    this.index = newIndex;
  }
}
