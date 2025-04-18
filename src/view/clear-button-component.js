import { AbstractComponent  } from "../framework/view/abstract-component.js";

function createClearBtnComponentTemplate() {
    return (
        `<button type="submit" id="clear-button">✕ Очистить</button>`
      );
}

export default class ClearButtonComponent extends AbstractComponent {
    constructor() {
        super();
    }
    
    get template() {
        return createClearBtnComponentTemplate();
    }

    disable() {
        this.element.disabled = true; 
    }
  }