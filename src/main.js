import HeaderComponent from './view/header-component.js'
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js'
import TaskListComponent from './view/tasks-list-component.js'
import TaskComponent from './view/task-component.js'
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.new-task');
const boardContainer = document.querySelector('.board-app__main');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

const boardComponent = new TaskBoardComponent();
render(boardComponent, boardContainer);

const boardElement = boardComponent.getElement();

// const columnTitles = ['Название блока', 'Название блока', 'Название блока', 'Название блока'];

// columnTitles.forEach(title => {
  for (let i = 0; i < 4; i++) {
    const title = `Название блока`;
    const listComponent = new TaskListComponent(title);
    render(listComponent, boardElement);

    const listElement = listComponent.getElement().querySelector('.task-list');

    for (let j = 0; j < 3; j++) {
      render(new TaskComponent('Название первой задачи'), listElement);
    }
  }
