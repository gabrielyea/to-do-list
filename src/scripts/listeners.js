class Listeners {
  onClickEvent = (eventSource, ...options) => {
    eventSource.addEventListener('click', () => {
      options.forEach((option) => {
        option.callback(option.param);
      });
    });
  }

  onSubmitEvent = (eventSource, ...options) => {
    eventSource.addEventListener('submit', (e) => {
      options.forEach((option) => {
        option.callback(option.param);
      });
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
        options.forEach((option) => {
          option.callback(option.param);
        });
      }
    });
  }
}

const listener = new Listeners();
export { listener as default };
