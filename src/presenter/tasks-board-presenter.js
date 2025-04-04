import TaskComponent from "../view/task-component.js";    
import TaskListComponent from "../view/tasks-list-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import {render} from '../framework/render.js'

export default class TaskBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
    
        render(this.#tasksBoardComponent, this.#boardContainer);

        const tasksByStatus = {
            backlog: this.#boardTasks.filter(task => task.status === 'backlog'),
            process: this.#boardTasks.filter(task => task.status === 'process'),
            ready: this.#boardTasks.filter(task => task.status === 'ready'),
            trash: this.#boardTasks.filter(task => task.status === 'trash'),
        };
    

        Object.entries(tasksByStatus).forEach(([status, tasks]) => {
            const tasksListComponent = new TaskListComponent(status);
            render(tasksListComponent, this.#tasksBoardComponent.getElement());
    
            const taskListElement = tasksListComponent.getElement();
            tasks.forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, taskListElement);
            });

        if (status === 'trash') {
            const clearButtonComponent = new ClearButtonComponent();
            render(clearButtonComponent, tasksListComponent.getElement());
        }
        });

    }
}
