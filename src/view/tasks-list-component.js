import { createElement } from '../framework/render.js';
import { StatusLabel } from '../const.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';  

function createTaskListTemplate(status) {
  const statusLabel = StatusLabel[status];
  return (
    `<section class="task-column ${status}">
      <h3 class="task-title">${statusLabel}</h3>
      <ul class="task-list"></ul>
    </section>`
  );
}

export default class TaskListComponent extends AbstractComponent {

  constructor({status, label, onTaskDrop}) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListTemplate(this.status, this.label);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      onTaskDrop(taskId, this.status);
    });
  }

}
