import Actions from './actions.js';

/**
 * Custom listener class, gives me a way to centralize event calls.
 *
 ** Can create an instance of custom listener and share it with multiple classes.
 ** Actions registers multiple observer functions.
 ** Can boradcast one event to multiple observers.
 */
export default class CustomListener extends Actions {
  constructor(eventName, eventSource) {
    super();
    this.eventName = eventName;
    this.eventSource = eventSource;

    this.eventSource.addEventListener(this.eventName, () => {
      this.doActions({});
    });
  }
}
