import {AbstractComponent} from '../framework/view/abstract-component.js';


function createFormAddTaskComponentTemplate() {
    return (
        `<form action="/" method="post">
            <label for="task"><h2>Новая задача</h2></label>
            <input id="task" type="text" name="new-task" placeholder="Название задачи" required>
            <button type="submit" id="add-button">+  Добавить</button>
        </form>`
      );
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
