import {createElement} from '../framework/render.js';


function createFormAddTaskComponentTemplate() {
    return (
        `<form action="/" method="post">
            <label for="task"><h2>Новая задача</h2></label>
            <input id="task" type="text" name="new-task" placeholder="Название задачи" required>
            <button type="submit" id="add-button">+  Добавить</button>
        </form>`
      );
}


export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
