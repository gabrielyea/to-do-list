export default class Task {
  constructor(description) {
    this.index = 0;
    this.description = description;
    this.completed = false;
  }

  completeTask = () => {
    this.completed = true;
  }
}
