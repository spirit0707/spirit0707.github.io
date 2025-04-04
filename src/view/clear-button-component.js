import {createElement} from '../framework/render.js'; 

function createClearBtnComponentTemplate() {
    return (
        `<button type="submit" id="clear-button">✕ Очистить</button>`
      );
}

export default class ClearButtonComponent {
  getTemplate() {
    return createClearBtnComponentTemplate();
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