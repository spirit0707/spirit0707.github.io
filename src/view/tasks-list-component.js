import { createElement } from '../framework/render.js';

function createTaskListTemplate(title) {
  return (
    `<section class="task-column">
      <h3 class="task-title">${title}</h3>
      <ul class="task-list"></ul>
    </section>`
  );
}

export default class TaskListComponent {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskListTemplate(this.title);
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