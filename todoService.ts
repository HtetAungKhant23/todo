import { Todo } from "./todo";
import { TodoRepository } from "./todoRepository";

export class TodoService {
  constructor(private todoRepo: TodoRepository) {}

  async create(title: string, description: string): Promise<Todo> {
    return this.todoRepo.create(title, description);
  }

  async get(): Promise<Todo[]> {
    return this.todoRepo.get();
  }

  async getById(id: string): Promise<Todo | null> {
    return this.todoRepo.getById(id);
  }

  async updateComplete(id: string, action: boolean): Promise<Todo> {
    return this.todoRepo.updateComplete(id, action);
  }

  async delete(id: string): Promise<void> {
    return this.todoRepo.delete(id);
  }
}
