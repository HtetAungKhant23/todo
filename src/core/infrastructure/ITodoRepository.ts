import { Todo } from "../entity/todo";

export interface ITodoRepository {
  create(title: string, description: string): Promise<Todo>;
  get(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  updateComplete(id: string, action: boolean): Promise<Todo>;
  delete(id: string): Promise<void>;
}
