import '../scss/main.scss';
import TaskUtils from './components/task/task-utils.js';

const task = new TaskUtils();

window.addEventListener('load', () => {
  task.init();
});
