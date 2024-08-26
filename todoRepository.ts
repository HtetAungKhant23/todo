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
}
