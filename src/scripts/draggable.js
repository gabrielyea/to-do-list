import taskList from './task-list.js';

class Draggable {
  templateTarget = document.querySelector('.task-list');

  startElement;

  endElement;

  makeDraggable = (element, sort) => {
    element.classList.add('draggable');
    element.draggable = 'true';
    element.addEventListener('dragstart', this.onDragStart);
    element.addEventListener('dragenter', this.onDragEnter);
    element.addEventListener('dragover', this.onDragOver);
    element.addEventListener('dragleave', this.onDragLeave);
    element.addEventListener('drop', this.onDragDrop);
    element.addEventListener('dragend', () => {
      this.onDragEnd();
      sort();
      // console.log("sort?")
    });
  };

  onDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    this.startElement = taskList.findElement(event.target);
  }

  onDragEnter = (event) => {
    event.preventDefault();
  }

  onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  }

  onDragLeave = () => {}

  onDragDrop = (event) => {
    this.endElement = taskList.findElement(event.target);
  }

  onDragEnd = () => {
    if (this.endElement === null || this.endElement === undefined) {
      return;
    }

    const temp = this.startElement.index;
    this.startElement.indexNumber = this.endElement.index;
    this.endElement.indexNumber = temp;
  }
}

const draggable = new Draggable();
export { draggable as default };
