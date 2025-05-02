import TaskComponent from "../view/task-component.js";    
import TaskListComponent from "../view/tasks-list-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import {render} from '../framework/render.js'
import {Status, StatusLabel, UserAction} from "../const.js";
import LoadingViewComponent from "../view/loading-view-component.js";


export default class TaskBoardPresenter {
    #loadingComponent = new LoadingViewComponent();
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);

        await this.#tasksModel.init();

        this.#boardContainer.removeChild(this.#loadingComponent.element);
        this.#clearBoard();
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
            this.#handleClearBaskerClick();
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
        const tasksListComponent = new TaskListComponent({
            status,
            label: StatusLabel[status],
            onTaskDrop: this.#handleTaskDrop.bind(this),
        });
    
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

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
        };

    async createTask() {
        const taskTitle = document.querySelector('#task').value.trim();
        if (!taskTitle) {
        return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#task').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи', error);
        }
    }

    #handleModelChange(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
        }
    }

    async #handleTaskDrop(taskId, newStatus) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи', err);
        }
    }

    async #handleClearBaskerClick(){
        try {
        await this.#tasksModel.clearTrash();
        } catch (err) {
        console.error('Ошибка при очистке корзины', err);
    }
    }

    clearTrash() {
        this.#tasksModel.clearTrash();
    
        this.#clearBoard();
        this.#renderBoard();
    }

}


