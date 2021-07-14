import taskList from './task-list.js';

/**
 * Contains functionality to make draggable items.
 *
 * @function makeDraggable(element, ...options) Makes html element draggable.
 ** To register an observer function send it in the options argument.
 ** Obersver functions will be called after drop.
 */
class Draggable {
  templateTarget = document.querySelector('.task-list');

  startElement;

  endElement;

  /**
   * Makes a html object draggable.
   *
   ** Applies all drag events to the object.
   ** Invokes callback functions after dropping element.
   * @param {HTMLElement} element Html object to make draggable.
   * @param {options} callback Register all observer functions here.
   */
  makeDraggable = (element, ...options) => {
    element.classList.add('draggable');
    element.draggable = 'true';
    element.addEventListener('dragstart', this.onDragStart);
    element.addEventListener('dragenter', this.onDragEnter);
    element.addEventListener('dragover', this.onDragOver);
    element.addEventListener('dragleave', this.onDragLeave);
    element.addEventListener('drop', this.onDragDrop);
    element.addEventListener('dragend', () => {
      this.onDragEnd();
      options.forEach((option) => {
        option.callback();
      });
    });
  }

  onDragStart = (event) => {
    event.target.classList.add('drag');
    event.dataTransfer.effectAllowed = 'move';
    this.startElement = taskList.findElement(event.target);
  }

  onDragEnter = (event) => {
    event.preventDefault();
  }

  onDragOver = (event) => {
    if (this.isValidDragElement(event.target)) {
      event.target.classList.add('over');
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  }

  onDragLeave = (event) => {
    if (this.isValidDragElement(event.target)) {
      event.target.classList.remove('over');
    }
  }

  onDragDrop = (event) => {
    if (this.isValidDragElement(event.target)) {
      this.endElement = taskList.findElement(event.target);
      const temp = this.startElement.index;
      this.startElement.indexNumber = this.endElement.index;
      this.endElement.indexNumber = temp;
    }
  }

  onDragEnd = () => {
    this.startElement.reference.classList.remove('over', 'drag');
    this.endElement.reference.classList.remove('over', 'drag');
  }

  isValidDragElement = (element) => {
    if (element.draggable) {
      return true;
    }
    return false;
  }
}

const draggable = new Draggable();
export { draggable as default };
