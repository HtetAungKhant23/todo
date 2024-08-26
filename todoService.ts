import { Todo } from "./todo";
import { TodoRepository } from "./todoRepository";

export class TodoService {
  constructor(private todoRepo: TodoRepository) {}

  async create(title: string, description: string): Promise<Todo> {
    return this.todoRepo.create(title, description);
  }
}
