import TaskComponent from "../view/task-component.js";    
import TaskListComponent from "../view/tasks-list-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import {render} from '../framework/render.js'
import {Status} from "../const.js";
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

        Object.values(Status).forEach(status => {
            const tasks = this.#tasksModel.getTasksByStatus(status);
            const tasksListComponent = new TaskListComponent(status);
            render(tasksListComponent, this.#tasksBoardComponent.getElement());
        
            const taskListElement = tasksListComponent.getElement();
            tasks.forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, taskListElement);
            });
    
            if (status === Status.TRASH) { 
                render(new ClearButtonComponent(), tasksListComponent.getElement());
            }
        });
    }
}
