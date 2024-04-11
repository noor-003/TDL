export class TodoItem {
    id: number;
    task: string;
    completed: boolean;
  
    constructor(id: number, task: string, completed = false) {
      this.id = id;
      this.task = task;
      this.completed = completed;
    }
  
    printDetails(this: TodoItem): void {
        console.log(`${this.id}. ${this.task} ${this.completed ? "[completed]" : ""}`);
      }
  }