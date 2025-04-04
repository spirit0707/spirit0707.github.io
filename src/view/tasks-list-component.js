import { createElement } from '../framework/render.js';
import { StatusLabel } from '../const.js';

function createTaskListTemplate(status) {
  const statusLabel = StatusLabel[status];
  return (
    `<section class="task-column ${status}">
      <h3 class="task-title">${statusLabel}</h3>
      <ul class="task-list"></ul>
    </section>`
  );
}

export default class TaskListComponent {

  constructor (status) {
    this.status = status;
  }

  getTemplate() {
    return createTaskListTemplate(this.status);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}