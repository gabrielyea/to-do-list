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
}

const ux = new UserInterface();
export { ux as default };
