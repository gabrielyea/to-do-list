class UserInterface {
  clearBtn = document.querySelector('.clear-btn');

  inputField = document.querySelector('.task-input')

  // init = () => {
  //   // listeners.onClickEvent(this.clearBtn,
  //   //   { callback: task.sortTaskList });

  //   listeners.onTaskSubmited(this.inputField,
  //     { callback: this.clearInputField });
  // }

  clearInputField = () => {
    this.inputField.value = '';
  }

  setValuesOfTaskElement = (element, { description, completed }) => {
    element.querySelector('.checkbox').checked = completed;
    element.querySelector('.task-description').innerText = description;
  }
}

const ux = new UserInterface();
export { ux as default };