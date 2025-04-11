import { AbstractComponent } from "../framework/view/abstract-component.js" 

export default class EmptyTaskComponent extends AbstractComponent {
    get template() {
      return `
        <li class="empty-task"> Перетащите карточку</li>`;
    }
  }