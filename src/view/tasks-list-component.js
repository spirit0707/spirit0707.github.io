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
  #status;

  constructor(status) {
    super();
    this.#status = status;
  }

  get template() {
    return createTaskListTemplate(this.#status);
  }
}
