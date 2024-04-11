#!/usr/bin/env node

import { TodoList } from "./TodoList.js";
import { TodoItem } from "./todoItem.js";

import inquirer from "inquirer";

let todos: TodoItem[] = []; // Replace with initial todos (optional)
let list: TodoList = new TodoList("Your Name", todos);

function displayTodoList(): void {
  console.log(`${list.userName}'s Todo List  (${list.getItemCounts().incomplete} items to do)`);
  list.todos.forEach((item) => item.printDetails());
}

enum Commands {
  Add = "Add Todo",
  MarkComplete = "Mark Complete",
  Delete = "Delete Todo",
  Quit = "Quit",
}

async function promptUser(): Promise<void> {
  console.clear();
  displayTodoList();
  const { command } = await inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands),
  });

  switch (command) {
    case Commands.Add:
      await addTodo();
      break;
    case Commands.MarkComplete:
      await markComplete();
      break;
    case Commands.Delete:
      await deleteTodo();
      break;
    case Commands.Quit:
      return;
  }
  promptUser(); // Recursively call prompt after action
}

async function addTodo(): Promise<void> {
  const { task } = await inquirer.prompt({
    type: "input",
    name: "task",
    message: "Enter new todo task:",
  });
  list.todos.push(new TodoItem(list.todos.length + 1, task));
  console.log("Todo added successfully!");
}

async function markComplete(): Promise<void> {
  const todoChoices = list.todos.map((todo) => ({
    name: `${todo.task} (${todo.completed ? "Completed" : "Pending"})`,
    value: todo.id,
  }));
  const { todoId } = await inquirer.prompt({
    type: "list",
    name: "todoId",
    message: "Select todo to mark complete:",
    choices: todoChoices,
  });
  const foundTodo = list.todos.find((todo) => todo.id === todoId);
  if (foundTodo) {
    foundTodo.completed = !foundTodo.completed;
    console.log("Todo status updated successfully!");
  }
}

// Function to delete a todo (assuming implementation)
async function deleteTodo(): Promise<void> {
    const todoChoices = list.todos.map((todo) => ({
      name: todo.task,
      value: todo.id,
    }));
    const { todoId } = await inquirer.prompt({
      type: "list",
      name: "todoId",
      message: "Select todo to delete:",
      choices: todoChoices,
    });
    
    const indexToDelete = list.todos.findIndex((todo) => todo.id === todoId);
    if (indexToDelete !== -1) {
      list.todos.splice(indexToDelete, 1);
      console.log("Todo deleted successfully!");
    } else {
      console.log("Todo not found!");
    }
  }

// Start the application
promptUser();