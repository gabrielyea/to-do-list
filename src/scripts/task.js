export default class Task {
  constructor(description, reference = null) {
    this.index = 0;
    this.description = description;
    this.completed = false;
    this.reference = reference;
  }

  completeTask = () => {
    this.completed = true;
  }

  /**
   * @param {number} newIndex
   */
  set indexNumber(newIndex) {
    this.index = newIndex;
  }
}
