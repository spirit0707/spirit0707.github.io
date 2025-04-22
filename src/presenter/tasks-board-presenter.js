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

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
    }

    get tasks() {
        return this.#tasksModel.getTasks();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderClearButton(container) {
        const clearButtonComponent = new ClearButtonComponent();
        clearButtonComponent.element.addEventListener('click', () => {
            this.clearTrash();
        });
        
        if (this.#tasksModel.getTasksByStatus('trash').length === 0) {
            clearButtonComponent.disable();
        }
    
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
            const clearButtonComponent = new ClearButtonComponent();
            if (tasksForStatus.length === 0) {
                clearButtonComponent.disable(); 
            }
            clearButtonComponent.element.addEventListener('click', () => {
                this.clearTrash();
            });
            render(clearButtonComponent, taskListElement);
        }
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
    
        Object.values(Status).forEach(status => {
            this.#renderTasksList(status); 
        });
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
        };

    createTask() {
        const taskTitle = document.querySelector('#task').value.trim();
        if (!taskTitle) {
        return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('#task').value = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    clearTrash() {
        this.#tasksModel.clearTrash();
    
        this.#clearBoard();
        this.#renderBoard();
    }

}


