import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  const { title } = task;
  return (
    `<li class="task-item">${title}</li>`
  );
}
export default class TaskComponent extends AbstractComponent {
  #task;

  constructor({ task }) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }
}
