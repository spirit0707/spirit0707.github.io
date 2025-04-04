import TaskComponent from "../view/task-component.js";    
import TaskListComponent from "../view/tasks-list-component.js";
import TaskBoardComponent from "../view/task-board-component.js";

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
    
        const statuses = ['backlog', 'process', 'ready', 'trash'];
    
        for (let i = 0; i < statuses.length; i++) {
            const status = statuses[i];
            const tasksForStatus = this.#boardTasks.filter(task => task.status === status);
    
            const listComponent = new TaskListComponent(status);
            render(listComponent, this.#tasksBoardComponent.getElement());
    
            const listElement = listComponent.getElement().querySelector('.task-list');
    
            for (let j = 0; j < tasksForStatus.length; j++) {
                const task = tasksForStatus[j];
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, listElement);
            }
        }
    }
}
