import Actions from './actions.js';

export default class CustomListener extends Actions {
  constructor(eventName, eventSource) {
    super();
    this.eventName = eventName;
    this.eventSource = eventSource;

    this.eventSource.addEventListener(this.eventName, () => {
      this.doActions();
    });
  }
}
