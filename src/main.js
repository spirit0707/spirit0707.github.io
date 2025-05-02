import HeaderComponent from './view/header-component.js'
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js'
import TasksModel from './model/tasks-model.js';
import { render, RenderPosition } from './framework/render.js';
import TasksApiService from './tasks-api-service.js'

const END_POINT = 'https://68149d60225ff1af16296e19.mockapi.io/';
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.new-task');
const tasksBoardContainer = document.querySelector('.board-app__main');

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT)
});

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);

tasksBoardPresenter.init();
  
