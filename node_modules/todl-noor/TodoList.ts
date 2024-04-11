import { TodoItem } from "./todoItem.js";

export class TodoList {
  userName: string;
  todos: TodoItem[];

  constructor(userName: string, todos: TodoItem[]) {
    this.userName = userName;
    this.todos = todos;
  }

  getItemCounts(): { incomplete: number; total: number } {
    const completedCount = this.todos.filter((todo) => todo.completed).length;
    return { incomplete: this.todos.length - completedCount, total: this.todos.length };
  }
}