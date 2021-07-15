class UserInterface {
  clearBtn = document.querySelector('.clear-btn');

  inputField = document.querySelector('.task-input');

  clearInputField = () => {
    this.inputField.value = '';
  }

  setValuesOfTaskElement = (element, { description, completed }) => {
    element.querySelector('.checkbox').checked = completed;
    element.querySelector('.task-description').innerText = description;
  }

  toggleEditStyle = (elements) => {
    this.toggleHide(elements);
    this.toggleEdit(elements);
  }

  toggleHide = (elements) => {
    const toggleThis = elements.getElementsByClassName('icon');
    Object.entries(toggleThis).forEach((element) => {
      element[1].classList.toggle('hide');
    });
  }

  toggleEdit = (elements) => {
    elements.classList.toggle('edit');
  }

  setDefaultStyle = (list) => {
    list.forEach((element) => {
      element.reference.querySelector('.delete').classList.add('hide');
      element.reference.querySelector('.three-dots-container').classList.remove('hide');
      element.reference.classList.remove('edit');
    });
  }

  /**
   * Will set default style for all list elements but the current one.
   *
   ** Prevents overwrite of current task values.
   * @param {Array} list list of task of elements to style.
   * @param {*} current task to ignore.
   */
  setDefaultStyleOfAllButCurrent = (list, current) => {
    list.forEach((element) => {
      if (element.reference !== current) {
        element.reference.querySelector('.delete').classList.add('hide');
        element.reference.querySelector('.three-dots-container').classList.remove('hide');
        element.reference.classList.remove('edit');
      }
    });
  }
}

const ux = new UserInterface();
export { ux as default };
