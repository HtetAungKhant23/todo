import { PrismaClient } from "@prisma/client";
import { Todo } from "./todo";

export class TodoRepository {
  constructor(private prisma: PrismaClient) {}

  async create(title: string, description: string): Promise<Todo> {
    const newTodo = await this.prisma.todo.create({
      data: {
        title,
        description,
      },
    });

    return new Todo(
      newTodo.id,
      newTodo.title,
      newTodo.description,
      newTodo.completed,
    );
  }

  async get(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany();
    return todos.map(
      (todo) => new Todo(todo.id, todo.title, todo.description, todo.completed),
    );
  }

  async getById(id: string): Promise<Todo | null> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) return null;
    return new Todo(todo.id, todo.title, todo.description, todo.completed);
  }

  async updateComplete(id: string, action: boolean): Promise<Todo> {
    const updatedTodo = await this.prisma.todo.update({
      where: { id },
      data: { completed: action },
    });
    return new Todo(
      updatedTodo.id,
      updatedTodo.title,
      updatedTodo.description,
      updatedTodo.completed,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.todo.delete({ where: { id } });
  }
}
