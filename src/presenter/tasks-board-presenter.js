import TaskComponent from "../view/task-component.js";    
import TaskListComponent from "../view/tasks-list-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
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
        
        render(this.#tasksBoardComponent, this.#boardContainer);
    
        Object.values(Status).forEach(status => {
            const tasksForStatus = this.#tasksModel.getTasksByStatus(status); 
            const tasksListComponent = new TaskListComponent(status);
            render(tasksListComponent, this.#tasksBoardComponent.element);
        
            tasksForStatus.forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, tasksListComponent.element);
            });
    
            if (status === Status.TRASH) { 
                render(new ClearButtonComponent(), tasksListComponent.getElement());
            }
        });
    }
}
