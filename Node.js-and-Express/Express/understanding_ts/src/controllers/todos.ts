import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({ message: "TODOを作成しました", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updateText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("対象のTODOが見つかりませんでした");
  }
  TODOS[todoIndex] = new Todo(todoId, updateText);
  res.json({ message: "Updated", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("対象のTODOが見つかりませんでした");
  }
  TODOS.splice(todoIndex, 1);
  res.json({ message: "TODOを削除しました" });
};
