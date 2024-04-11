export class TodoItem {
    id;
    task;
    completed;
    constructor(id, task, completed = false) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
    printDetails() {
        console.log(`${this.id}. ${this.task} ${this.completed ? "[completed]" : ""}`);
    }
}
