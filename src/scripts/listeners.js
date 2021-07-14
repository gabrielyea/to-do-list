class Listeners {
  onClickEvent = (eventSource, ...options) => {
    eventSource.addEventListener('click', () => {
      this.invokeAllCallbacks(...options);
    });
  }

  onSubmitEvent = (eventSource, ...options) => {
    eventSource.addEventListener('submit', (e) => {
      this.invokeAllCallbacks(...options);
      e.preventDefault();
    });
  }

  /**
   * Registers an event on enter key press.
   *
   * @param {Object} eventSource a Dom object.
   * @param {Object} options an object: {callback: fun, param: values}
   */
  onTaskSubmited = (eventSource, ...options) => {
    eventSource.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.invokeAllCallbacks(...options);
      }
    });
  }

  onCheckBoxChange = (eventSource, ...options) => {
    eventSource.addEventListener('change', () => {
      this.invokeAllCallbacks(...options);
    });
  }

  invokeAllCallbacks = (...options) => {
    options.forEach((option) => {
      option.callback(option.param);
    });
  }
}

const listener = new Listeners();
export { listener as default };
