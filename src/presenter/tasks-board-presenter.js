import TaskComponent from "../view/task-component.js";    
import TaskListComponent from "../view/tasks-list-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import {render} from '../framework/render.js'
import {Status, StatusLabel} from "../const.js";
import TasksModel from "../model/tasks-model.js";

export default class TaskBoardPresenter {
    #boardContainer = null;
    #tasksModel = new TasksModel();
    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
        this.#renderBoard();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderClearButton(container) {
        const clearButtonComponent = new ClearButtonComponent();
        render(clearButtonComponent, container);
    }

    #renderEmptyTask(container) {
        const emptyTaskComponent = new EmptyTaskComponent();
        render(emptyTaskComponent, container);
    }

    #renderTasksList(status) {
        const tasksForStatus = this.#tasksModel.getTasksByStatus(status);
        const tasksListComponent = new TaskListComponent(status);
        render(tasksListComponent, this.#tasksBoardComponent.element);
    
        const taskListElement = tasksListComponent.element.querySelector('.task-list');
    
        if (tasksForStatus.length === 0) {
            this.#renderEmptyTask(taskListElement);
        } else {
            tasksForStatus.forEach(task => {
                this.#renderTask(task, taskListElement);
            });
        }
    
        if (status === Status.TRASH) {
            this.#renderClearButton(taskListElement);
        }
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
    
        Object.values(Status).forEach(status => {
            this.#renderTasksList(status); 
        });
    }
}


