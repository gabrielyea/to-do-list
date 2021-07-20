import Actions from '../utils/actions.js';

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

  onUpdateData = new Actions();

  toggleComplete = () => {
    this.completed = !this.completed;
  }

  updateDescription = (desc) => {
    this.description = desc;
  }

  /**
   * @param {String} desc
   */
  set setDescription(desc) {
    this.description = desc;
  }

  /**
   * @param {number} newIndex
   */
  set indexNumber(newIndex) {
    this.index = newIndex;
  }

  get info() {
    return {
      description: this.description,
      reference: this.reference,
      completed: this.completed,
      index: this.index,
    };
  }
}
