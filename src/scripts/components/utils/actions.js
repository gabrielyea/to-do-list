export default class Actions {
  actions = [];

  addAction = (...fun) => {
    fun.forEach((action) => {
      this.actions.push(action);
    });
  }

  contains = (search) => {
    const found = this.actions.find((action) => search === action);
    if (found) {
      return true;
    }
    return false;
  }

  removeAction = (search) => {
    this.actions = this.actions.filter((fun) => search !== fun);
  }

  doActions = () => {
    this.actions.forEach((fun) => fun());
  }
}