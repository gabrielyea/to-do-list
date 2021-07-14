class UserInterface {
  clearBtn = document.querySelector('.clear-btn');

  inputField = document.querySelector('.task-input')

  clearInputField = () => {
    this.inputField.value = '';
  }

  setValuesOfTaskElement = (element, { description, completed }) => {
    element.querySelector('.checkbox').checked = completed;
    element.querySelector('.task-description').innerText = description;
  }

  toggleHide = (elements) => {
    Object.entries(elements).forEach((element) => {
      element[1].classList.toggle('hide');
    });
  }
}

const ux = new UserInterface();
export { ux as default };