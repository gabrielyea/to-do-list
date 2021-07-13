import '../scss/main.scss';
import taskList from './task-list.js';
import TaskUtils from './task-utils.js';
import UserInterface from './user-interface.js';

const task = new TaskUtils();
const ux = new UserInterface();
const setExampleTasks = () => {
  taskList.addToList(task.createTaskElement({ description: 'Clean the house' }));
  taskList.addToList(task.createTaskElement({ description: 'Walk the dog' }));
  taskList.addToList(task.createTaskElement({ description: 'Make lunch' }));
  task.appendElementsToList();
};

task.init();
ux.init();
setExampleTasks();