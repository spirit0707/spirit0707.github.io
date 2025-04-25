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
    addTask(title, status = 'backlog', position = null) {
        const newTask = {
            title,
            status,
            id: generateID(),
        };
    
        if (position !== null && position >= 0 && position <= this.#boardtasks.length) {
            const tasksForStatus = this.getTasksByStatus(status);
            const indexInStatus = tasksForStatus[position] 
                ? this.#boardtasks.indexOf(tasksForStatus[position]) 
                : this.#boardtasks.length;
    
            this.#boardtasks.splice(indexInStatus, 0, newTask);
        } else {
            this.#boardtasks.push(newTask);
        }
    
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

    updateTaskStatus(taskId, newStatus, position = null) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            this.#boardtasks = this.#boardtasks.filter(t => t.id !== taskId);
    
            task.status = newStatus;
    

            const tasksForStatus = this.getTasksByStatus(newStatus);
            const indexInStatus = position !== null && position >= 0 && position < tasksForStatus.length
                ? this.#boardtasks.indexOf(tasksForStatus[position])
                : this.#boardtasks.length;
    
            this.#boardtasks.splice(indexInStatus, 0, task);
    
            this._notifyObservers();
        }
    }
}