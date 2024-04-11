export class TodoList {
    userName;
    todos;
    constructor(userName, todos) {
        this.userName = userName;
        this.todos = todos;
    }
    getItemCounts() {
        const completedCount = this.todos.filter((todo) => todo.completed).length;
        return { incomplete: this.todos.length - completedCount, total: this.todos.length };
    }
}
