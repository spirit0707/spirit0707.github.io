import {tasks} from '../mock/task.js';
import { generateID } from '../utils.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    getTasks() {
        return this.#boardtasks
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }

    clearTrash() {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
        this._notifyObservers(); 
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            this._notifyObservers();
        }
    }
}